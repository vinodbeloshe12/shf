import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get(apiUrl + 'getAllUsers', httpOptionsGet);
  }

  createUser(data) {
    return this.http.post(apiUrl + 'createUser', JSON.stringify(data), httpOptionsPost);
  }
  deleteUser(id) {
    return this.http.get(apiUrl + 'deleteUser?id=' + id, httpOptionsGet);
  }
}
