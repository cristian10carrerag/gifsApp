import { Component } from '@angular/core';
import { gifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor (private gifsService : gifsService){}

  get tags() { 
    return this.gifsService.tagHistory;
  }

  searchTag(tag : string){
    this.gifsService.searchTag(tag);
  }

}
