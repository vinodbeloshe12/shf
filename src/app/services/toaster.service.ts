import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }
  private subject = new Subject<any>();

  show(message: string, type) {
    this.subject.next({ text: message, type });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
