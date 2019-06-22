import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-measures',
  templateUrl: './authenticated-measures.component.html',
  styleUrls: ['./authenticated-measures.component.less']
})
export class AuthenticatedMeasuresComponent implements OnInit {
  language = localStorage.getItem('language');
  constructor() { }

  ngOnInit() {
  }

}
