import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsGetVideo } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getImagesGallery() {
    return this.http.get(apiUrl + "getgallery", httpOptionsGet);
  }

  getVideoGallery() {
    return this.http.get(apiUrl + "getVideoGallery", httpOptionsGet);
  }
}
