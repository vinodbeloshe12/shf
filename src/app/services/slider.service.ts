import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  apiUrl,
  httpOptionsGet,
  httpOptionsPost,
  httpOptionsAdmin
} from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class SliderService {
  constructor(private http: HttpClient) { }

  getAllSlider() {
    return this.http.get(apiUrl + "getallSliderImage", httpOptionsGet);
  }
  createSlider(data) {
    // return this.http.post(apiUrl + 'createSliderImage', JSON.stringify(data), httpOptionsPost);
    let body = new FormData();
    if (data.id) {
      body.append("id", data.id);
    }
    body.append("image_name", data.image_name);
    body.append("description", data.description);
    body.append("image", data.image);
    body.append("status", data.status);
    body.append("order", data.order);
    return this.http.post(apiUrl + "createSliderImage", body, httpOptionsAdmin);
  }


  deleteSlider(id) {
    return this.http.get(apiUrl + "deleteSliderImage?id=" + id, httpOptionsGet);
  }
}
