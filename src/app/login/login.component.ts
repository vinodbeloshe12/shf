import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userData: any = {};
  toggleButton: boolean;
  signUpUserData = {
    firstname: "",
    lastname: "",
    email: "",
    username: ""
  }
  firstNameInvalid: boolean = false;
  lastNameInvalid: boolean = false;
  emailInvalid: boolean = false;
  userNameInvalid: boolean = false;
  errorMessage: string = "required";
  language: string = localStorage.getItem("language");
  sectionVisible: string = "Login";
  // document.querySelector('.img__btn').addEventListener('click', function() {
  //   document.querySelector('.cont').classList.toggle('s--signup');
  // });
  constructor(public loginService: LoginService) { }
  ngOnInit() {
  }

  signUp() {
    this.loginService.signUpUser(this.signUpUserData).subscribe((res: any) => {
      if (res && !res.value) {
        this.validateSignUp(res.message, res.field);
      }
      else {
        console.log(res);
      }
    });
  }

  validateSignUp(message, field) {
    if (this.signUpUserData.firstname == "") {
      this.firstNameInvalid = true;
    } else {
      this.firstNameInvalid = false;
    }
    if (this.signUpUserData.lastname == "") {
      this.lastNameInvalid = true;
    } else {
      this.lastNameInvalid = false;
    }
    if (this.signUpUserData.email == "" || field == "email") {
      this.emailInvalid = true;
      this.errorMessage = message;
    } else {
      this.emailInvalid = false;
    }
    if (this.signUpUserData.username == "" || field == "username") {
      this.userNameInvalid = true;
      this.errorMessage = message;
    } else {
      this.userNameInvalid = false;
    }
  }

  login(data) {
    console.log("daata", data)
    this.loginService.getLogin(data).subscribe((res: any) => {
      if (res.value) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        location.href = '/home';
      }
      else {
        alert("please enter valid username and password");
      }

    }, error => console.log(error));
  }

  toggleClick(section) {
    this.toggleButton = !this.toggleButton
    this.sectionVisible = section;
  }
}
