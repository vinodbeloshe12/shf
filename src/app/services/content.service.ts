import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost, httpOptionsAdmin } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getContent(title) {
    return this.http.get(apiUrl + 'getContent?content=' + title, httpOptionsGet);
  }
  getAllContent() {
    return this.http.get(apiUrl + 'getAllContentPage', httpOptionsGet);
  }

  contactSubmit(data) {
    return this.http.post(apiUrl + "submitContact", JSON.stringify(data), httpOptionsPost);
  }
  getAllContentPage() {
    return this.http.get(apiUrl + "getAllContentPage", httpOptionsGet)
  }


  createContent(data) {
    let body = new FormData();
    if (data.id) {
      body.append('id', data.id);
    }
    body.append('title_english', data.title_english);
    body.append('title_hindi', data.title_hindi);
    body.append('image', data.image);
    body.append('description_english', data.description_english);
    body.append('description_hindi', data.description_hindi);
    body.append('status', data.status);
    return this.http.post(apiUrl + "createContent", body, httpOptionsAdmin);
  }

  deleteContent(id) {
    return this.http.get(apiUrl + 'deleteContent?id=' + id, httpOptionsGet);
  }
}
