import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class gifsService {

    public gifList : Gif[] = [];

    private _tagHistory : string[] = [];
    private apiKey: string = 'J2VfkcGJF96980DAP2KHyGVyDPRyIQ3X';
    private serviceUrl : string = 'https://api.giphy.com/v1/gifs/';
    
    constructor(private http: HttpClient) { }

    get tagHistory(){
        return [...this._tagHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLocaleLowerCase();

        if (this._tagHistory.includes(tag)){
            this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
        }
        this._tagHistory.unshift(tag);
        this._tagHistory = this.tagHistory.splice(0,10);
    }

    searchTag(tag: string): void{

        if (tag.length === 0) return;
        this.organizeHistory(tag)

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '20')
        .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}search`, {params})
        .subscribe(resp  => {
            this.gifList = resp.data;
            console.log({gifs : this.gifList}); 
        });
    }
    
}