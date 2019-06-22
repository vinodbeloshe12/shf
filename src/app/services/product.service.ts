import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl, httpOptionsPost, httpOptionsAdmin, httpOptionsGet } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  createProduct(data) {
    console.log("data", data)
    let body = new FormData();
    if (data.id) {
      body.append('id', data.id);
    }
    body.append('name_english', data.productNameEnglish);
    body.append('name_hindi', data.productNameHindi);
    body.append('description_english', data.descriptionEnglish);
    body.append('description_hindi', data.descriptionHindi);
    body.append('recommendation_english', data.recommendationEnglish);
    body.append('recommendation_hindi', data.recommendationHindi);
    body.append('category_id', data.category);
    body.append('stock', data.stockQuantity);
    // body.append('image_name', JSON.stringify(data.imagePath));
    for (let i = 0; i < data.imagePath.length; i++) {
      body.append("image_name[]", data.imagePath[i], data.imagePath[i]['name']);
    }
    body.append('realated', JSON.stringify(data.relatedProduct));
    body.append('price', JSON.stringify(data.price));
    // body.append('price', data.price);
    body.append('status', data.status);
    body.append('enquiry', data.enquiry);
    return this.http.post(apiUrl + "createProduct", body, httpOptionsAdmin);
  }

  deleteProductImage(id) {
    return this.http.get(apiUrl + "deleteProductImage?id=" + id, httpOptionsGet);
  }
}
