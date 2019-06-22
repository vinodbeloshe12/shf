import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  userData: any;
  showForm: boolean = false;
  typeText: string = 'password';
  isEdit: boolean = false;
  formData: any = {};
  emailValidate: boolean;
  constructor(private userService: UserService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getUserList();
  }

  showPassword() {
    if (this.typeText == "password") {
      this.typeText = "text";
    } else {
      this.typeText = "password"
    }
  }

  getUserList() {
    this.userService.getUserList().subscribe((res: any) => {
      this.userData = res.data;
    }, err => console.log(err));
  }

  submitUserData(data) {
    console.log("data", data);
    this.userService.createUser(data).subscribe((res: any) => {
      // console.log("user created");
      if (res.value) {
        this.formData = {};
        this.showForm = false;
        this.isEdit = false;
        this.getUserList();
        this.toasterService.show(res.message, 'success');
      } else {
        this.toasterService.show(res.message, 'warning');
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

  deleteUser(data) {
    this.userService.deleteUser(data.id).subscribe((res: any) => {
      if (res.value) {
        this.getUserList();
        this.toasterService.show("User deleted successfully", 'success');
      } else {
        this.toasterService.show(res.message, 'warning');
      }
    }, err => console.log(err));
  }

  onEditSelect(data) {
    this.isEdit = true;
    this.formData = data;
    this.formData.id = data.id;
    this.showForm = true;
  }

  onButtonclick() {
    this.showForm = !this.showForm;
    this.formData = {};
    this.isEdit = false;
  }
}
