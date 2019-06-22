import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  getCartData() {
    return this.http.get(apiUrl + "getCart", httpOptionsGet);
  }
  checkCartData(product_id) {
    return this.http.get(apiUrl + "checkCart?product_id=" + product_id, httpOptionsGet);
  }

  updateCart(data) {
    return this.http.post(apiUrl + "updateCart", JSON.stringify(data), httpOptionsPost);
  }

  addToCart(data) {
    return this.http.post(apiUrl + "addToCart", JSON.stringify(data), httpOptionsPost);

  }

  deleteFromCart(id) {
    return this.http.get(apiUrl + "deleteCart?id=" + id, httpOptionsGet);
  }
}
