import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getListingData(id) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': "application/json, text/plain, */*",
    //   }), withCredentials: true
    // };
    return this.http.get(apiUrl + 'getProductbyCategoryID?id=' + id, httpOptionsGet);
  }

  getCategoryDetailsByName(name) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': "application/json, text/plain, */*",
    //   }), withCredentials: true
    // };
    return this.http.get(apiUrl + 'getCategoryDetailsByName?name=' + name, httpOptionsGet);
  }
}
