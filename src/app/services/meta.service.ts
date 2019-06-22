import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta, private title: Title) { }

  setTag(name, value) {
    if (this.meta.getTag('name= ' + name)) {
      this.removeTag(name);
    }
    this.meta.addTag({ name: name, content: value });
  }

  setTitle(title) {
    this.title.setTitle(title);
  }
  removeTag(name) {
    this.meta.removeTag('name = ' + name);
  }
}
