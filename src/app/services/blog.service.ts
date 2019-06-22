import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost, httpOptionsAdmin } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogDataById(id) {
    return this.http.get(apiUrl + "getBlogById?id=" + id, httpOptionsGet);
  }
  getAllBlog() {
    return this.http.get(apiUrl + "getAllBlog", httpOptionsGet);
  }

  createBlog(data) {
    let body = new FormData();
    if (data.id) {
      body.append('id', data.id);
    }
    body.append('title_english', data.titleEnglish);
    body.append('title_hindi', data.titleHindi);
    body.append('image', data.image);
    body.append('description_english', data.descriptionEnglish);
    body.append('description_hindi', data.descriptionHindi);
    body.append('status', data.status);
    return this.http.post(apiUrl + "createBlog", body, httpOptionsAdmin);
  }

  deleteBlog(id) {
    return this.http.get(apiUrl + "deleteBlog?id=" + id, httpOptionsGet);
  }
}
