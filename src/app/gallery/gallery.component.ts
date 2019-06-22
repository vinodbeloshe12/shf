import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
  userData: any;
  constructor() { }

  ngOnInit() {
  }
  login(userData) {

  }

}
