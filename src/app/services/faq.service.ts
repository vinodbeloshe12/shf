import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsAdmin } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  getFAQ() {
    return this.http.get(apiUrl + "getAllFAQ", httpOptionsGet);
  }
}
