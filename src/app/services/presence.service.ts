import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, httpOptionsGet, httpOptionsPost } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http: HttpClient) { }

  getAllLocations() {
    return this.http.get(apiUrl + "getAllLocations", httpOptionsGet);
  }
  deleteLocation(id) {
    return this.http.get(apiUrl + "deleteLocation?id=" + id, httpOptionsGet);
  }

  createLocation(data) {
    return this.http.post(apiUrl + "createLocation", JSON.stringify(data), httpOptionsPost);
  }
}
