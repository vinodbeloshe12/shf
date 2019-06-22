import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.less']
})


export class ContactusComponent implements OnInit {
  contactData: any = {};
  emailValidate: boolean = false;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }
  submitContact(data, form) {
    this.contentService.contactSubmit(data).subscribe((res: any) => {
      if (res.value) {
        this.contactData = {};
        if (form) {
          form.resetForm();
        }
        alert(res.message);
      } else {
        alert(res.message);
      }
    }, err => console.log(err));
  }

  onlyNumbers(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onlyAlphabates(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  validateEmail(email) {
    if (email) {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) == false) {
        this.emailValidate = true;
        return false;
      }
      else {
        this.emailValidate = false;
      }
    }
  }

}
