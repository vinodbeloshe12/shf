import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.less']
})
export class CertificateComponent implements OnInit {
  id: any;

  constructor() { }

  ngOnInit() {
  }

  openCertificate(id) {
    let element: any = document.getElementById("popUpContainerId");
    if (element) {
      element.classList.add("active");
      this.id = id;
    }
  }

  close(){
    let element: any = document.getElementById("popUpContainerId");
    if (element) {
      element.classList.remove("active");
    }
  }

}
