import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scientific-evidence',
  templateUrl: './scientific-evidence.component.html',
  styleUrls: ['./scientific-evidence.component.less']
})
export class ScientificEvidenceComponent implements OnInit {
  language = localStorage.getItem('language');
  constructor() { }

  ngOnInit() {
  }

}
