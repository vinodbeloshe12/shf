import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  userData: any = [];
  countries: any = [];
  showProductsForm: any;
  emailValidate: boolean;
  oldpass: string = '';
  newpass: string = '';
  retypepass: string = '';
  states: any = [];
  cities: any = [];
  shipcities: any = [];
  shipstates: any = [];
  shipcountries: any = [];
  constructor(private profileService: ProfileService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.getCountries('billing');
    this.getCountries('shipping');
  }

  detailFrmSubmit(data) {
    console.log("dddddddd", data);
    this.profileService.submitPersonalDetails(data).subscribe((res: object) => {
      console.log("updated", res);
      localStorage.setItem("userData", JSON.stringify(data));
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

  changePassword() {
    if (this.matchPassword()) {
      let sendData = {
        oldpass: this.oldpass,
        newpass: this.newpass
      }
      this.profileService.changePassword(sendData).subscribe((res: any) => {
        if (res.value) {
          this.toasterService.show(res.message, 'success');
          this.oldpass = "";
          this.newpass = "";
          this.retypepass = "";
        } else {
          this.toasterService.show(res.message, 'warning');
        }
      }, err => console.log(err));
    } else {
      console.log("pass does not match");
      this.toasterService.show("Confirm password and new password do not match", 'warning');
    }
  }

  matchPassword() {
    if (this.retypepass == this.newpass) {
      return true;
    } else {
      return false;
    }
  }

  getCountries(type) {
    this.profileService.getCountries().subscribe((res: any) => {
      if (res.value) {
        if (type == 'billing') {
          this.countries = res.data
        } else {
          this.shipcountries = res.data
        }
      }
    }, err => console.log(err));
  }
  getStateByCountry(data, type?) {
    this.profileService.getStateByCountry(data).subscribe((res: any) => {
      if (res.value) {
        if (type == 'billing') {
          this.states = res.data
        } else {
          this.shipstates = res.data
        }
      }
    }, err => console.log(err));
  }
  getCityByState(data, type?) {
    console.log("state", data);
    this.profileService.getCityByState(data).subscribe((res: any) => {
      if (res.value) {
        if (type == 'billing') {
          this.cities = res.data
        } else {
          this.shipcities = res.data
        }
      }
    }, err => console.log(err));
  }

}
