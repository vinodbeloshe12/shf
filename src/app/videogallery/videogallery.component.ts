import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
@Component({
  selector: 'app-videogallery',
  templateUrl: './videogallery.component.html',
  styleUrls: ['./videogallery.component.less']
})
export class VideogalleryComponent implements OnInit {
  safeURL: any;
  videoGallery: any;

  constructor(private galleryService: GalleryService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.galleryService.getVideoGallery().subscribe((res: any) => {
      if (res && res.value) {
        this.videoGallery = res.data;
      }
    });
  }

  updateVideoUrl(link: string) {
    let url = 'https://www.youtube.com/embed/' + _.replace(link, 'https://youtu.be/', '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
