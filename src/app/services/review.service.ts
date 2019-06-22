import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(data) {
    return this.http.post(apiUrl + "createReview", JSON.stringify(data), httpOptionsPost);
  }

  submitEnquiry(data) {
    return this.http.post(apiUrl + "submitEnquiry", JSON.stringify(data), httpOptionsPost);
  }


}
