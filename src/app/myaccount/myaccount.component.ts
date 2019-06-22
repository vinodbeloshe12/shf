import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.less']
})
export class MyaccountComponent implements OnInit {
  selectedPage: string = 'Profile';
  userData: any;
  navData = [{
    id: 1,
    name: "Profile"

  }, {
    id: 2,
    name: "Category"
  },
  {
    id: 3,
    name: "Product"
  },
  {
    id: 4,
    name: "Orders"
  }, {
    id: 5,
    name: "Pages"
  }, {
    id: 6,
    name: "Users"
  }
    , {
    id: 7,
    name: "Blogs"
  }
    , {
    id: 8,
    name: "Slider"
  }
    , {
    id: 9,
    name: "Location"
  }, {
    id: 10,
    name: "Navigation"
  }]

  usernavData = [{
    id: 1,
    name: "Profile"
  },
  {
    id: 4,
    name: "Orders"
  }]
  constructor() { }

  ngOnInit() {
    this.userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
  }

  selectPage(val) {
    console.log("val", val);
    this.selectedPage = val;
  }

}
