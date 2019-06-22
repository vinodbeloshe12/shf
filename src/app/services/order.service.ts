import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(apiUrl + "getOrderbyUserId", httpOptionsGet);
  }

  submitOrder(data) {
    return this.http.post(apiUrl + "submitOrder", JSON.stringify(data), httpOptionsPost);
  }
  updateOrderStatus(data) {
    return this.http.post(apiUrl + "updateOrderStatus", JSON.stringify(data), httpOptionsPost);
  }

  getOrderItem(id) {
    return this.http.get(apiUrl + "getOrderbyId?id=" + id, httpOptionsGet);
  }
}
