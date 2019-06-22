import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  getNavigation() {
    return this.http.get(apiUrl + "getNavigation", httpOptionsGet);
  }

  changeLanguage(lang) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': "application/json, text/plain, */*",
    //   }), withCredentials: true
    // };
    return this.http.get(apiUrl + "updateLanguage?lang=" + lang, httpOptionsGet);
  }

  updateCurrency(currency) {
    return this.http.get(apiUrl + "updateCurrency?currency=" + currency, httpOptionsGet);
  }

  getCurrency() {
    return this.http.get(apiUrl + "getcurrency", httpOptionsGet);
  }

  getLanguage() {
    return this.http.get(apiUrl + "getLanguage", httpOptionsGet);
  }

  getAllNavigation() {
    return this.http.get(apiUrl + "getAllNavigation", httpOptionsGet);
  }

  search(term) {
    let data = {
      term: term
    }
    return this.http.post(apiUrl + 'search', JSON.stringify(data), httpOptionsPost);
  }

  createNavigation(data) {
    return this.http.post(apiUrl + 'createNavigation', JSON.stringify(data), httpOptionsPost);
  }

  deleteNavigation(id) {
    return this.http.get(apiUrl + "deleteNavigation?id=" + id, httpOptionsGet);
  }

}
