import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

  constructor(private http: HttpClient) { }

  getMyAccountAllProducts() {
    return this.http.get(apiUrl + "getallproductsadmin", httpOptionsGet);
  }

  getProductByIdAdmin(id) {
    return this.http.get(apiUrl + "getProductByIdAdmin?id=" + id, httpOptionsGet);
  }
}
