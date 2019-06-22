import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  submitPersonalDetails(data) {
    return this.http.post(apiUrl + "submitPersonalDetails", JSON.stringify(data), httpOptionsPost);
  }
  changePassword(data) {
    return this.http.post(apiUrl + "changePassword", JSON.stringify(data), httpOptionsPost);
  }
  getCountries() {
    return this.http.get(apiUrl + "getCountry", httpOptionsGet);
  }
  getStateByCountry(name) {
    return this.http.get(apiUrl + "getStateByCountry?name=" + name, httpOptionsGet);
  }
  getCityByState(name) {
    return this.http.get(apiUrl + "getCityByState?name=" + name, httpOptionsGet);
  }

}
