import { HttpHeaders } from "@angular/common/http";

export const apiUrl = "http://theitlegends.net/shreeyantrabackend/index.php/API/";
export const imgUrl = "http://theitlegends.net/shreeyantrabackend/uploads/";

export const httpOptionsGet = {
  headers: new HttpHeaders({
    Accept: "application/json, text/plain, */*"
  }),
  withCredentials: true
};

export const httpOptionsPost = {
  headers: new HttpHeaders({
    Accept: "application/json",
    "Content-Type": "text/plain;charset=UTF-8"
  }),
  withCredentials: true
};

export const httpOptionsAdmin = {
  headers: new HttpHeaders({}),
  withCredentials: true
};

export const httpOptionsGetVideo = {
  headers: new HttpHeaders({
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Origin": "*",
    "X-Frame-Options": "allow"
  }),
  withCredentials: true
};
