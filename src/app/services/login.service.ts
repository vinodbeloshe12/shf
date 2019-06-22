import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsPost, httpOptionsGet } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  getLogin(data) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': "application/json",
    //     'Content-Type': "text/plain;charset=UTF-8"
    //   }), withCredentials: true
    // };
    return this.http.post(apiUrl + "login", JSON.stringify(data), httpOptionsPost);
  }

  logout() {
    return this.http.get(apiUrl + "logout", httpOptionsGet);
  }

  getUserDetails() {
    return this.http.get(apiUrl + "getuserdetails", httpOptionsGet);
  }

  signUpUser(userDetails) {
    let user;
    if (userDetails) {
      user = {
        "first_name": userDetails.firstname,
        "last_name": userDetails.lastname,
        "email": userDetails.email,
        "username": userDetails.username
      }
    }
    return this.http.post(apiUrl + "registerUser", JSON.stringify(user), httpOptionsPost);

  }




}
