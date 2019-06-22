import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl, httpOptionsPost, httpOptionsAdmin, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  createCategory(data) {
    console.log("data", data)
    let body = new FormData();
    if (data.id) {
      body.append("id", data.id);
    }
    body.append('name_english', data.nameEnglish);
    body.append('name_hindi', data.nameHindi);
    body.append('image', data.image);
    body.append('status', data.status);
    body.append('order', data.order);
    return this.http.post(apiUrl + "createCategory", body, httpOptionsAdmin);
  }

  getAllCategories() {
    return this.http.get(apiUrl + "getAllCategoriesAdmin", httpOptionsGet);
  }

  updateCategory(data) {
    console.log("data", data)
    let body = new FormData();
    body.append('id', data.id);
    body.append('name_english', data.nameEnglish);
    body.append('name_hindi', data.nameHindi);
    body.append('image', data.image);
    body.append('status', data.status);
    body.append('order', data.order);
    return this.http.post(apiUrl + "updateCategory", body, httpOptionsAdmin);
  }

  deleteCategory(id) {
    return this.http.get(apiUrl + "deleteCategory?id=" + id, httpOptionsGet);
  }

}
