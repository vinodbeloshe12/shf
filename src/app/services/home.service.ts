import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getAllSlider() {
    return this.http.get(apiUrl + "getAllSliderImage");
  }
  getHome() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': "application/json, text/plain, */*",
    //   }), withCredentials: true
    // };
    return this.http.get(apiUrl + "getHome", httpOptionsGet);
  }
}
