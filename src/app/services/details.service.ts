import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getProductDetails(id) {
    return this.http.get(apiUrl + 'getProductById?id=' + id, httpOptionsGet);
  }

}
