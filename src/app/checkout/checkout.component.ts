import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import * as _ from 'lodash';
import { OrderService } from 'src/app/services/order.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit {
  imageServer = imgUrl;
  placeOrder: boolean = false;
  terms: boolean = false;
  paymentMode: string = 'ccavenue';
  orderPlaced: boolean = false;
  toggleVal: any;
  userData: any;
  cartData: any;
  orderTotal: number;
  TotalItemsInCart: number;
  tempTotalArray: any = [];
  currency: any = JSON.parse(localStorage.getItem('currency'));
  language = localStorage.getItem('language') ? localStorage.getItem('language').toLowerCase() : 'EN';
  emailValidate: boolean;
  billingActivate: boolean;
  shippingActivate: boolean;
  paymentActivate: boolean;
  countries: any = [];
  states: any = [];
  cities: any = [];
  shipcities: any = [];
  shipstates: any = [];
  shipcountries: any = [];
  constructor(private cartService: CartService, private orderService: OrderService, private toasterService: ToasterService, private profileService: ProfileService) { }

  ngOnInit() {

    this.userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
    if (this.userData) {
      this.userData.billing_name = this.userData.firstname + " " + this.userData.lastname;
      this.userData.shipping_name = this.userData.firstname + " " + this.userData.lastname;
    }
    this.getCartData();
    this.getCountries('billing');
    this.getCountries('shipping');
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
  getStateByCountry(data, type) {
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
  getCityByState(data, type) {
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


  checkboxValue(value) {
    if (value) {
      this.userData.sfirstname = this.userData.billing_name,
        this.userData.shipping_address = this.userData.billing_address,
        this.userData.shipping_city = this.userData.billing_city,
        this.userData.shipping_state = this.userData.billing_state,
        this.userData.shipping_pincode = this.userData.billing_pincode,
        this.userData.shipping_country = this.userData.billing_country
    } else {
      this.userData.sfirstname = "",
        this.userData.shipping_address = "",
        this.userData.shipping_city = "",
        this.userData.shipping_state = "",
        this.userData.shipping_pincode = "",
        this.userData.shipping_country = ""
    }
  }

  accordian(val) {
    this.toggleVal = val
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


  submitOrder() {
    console.log("paymentMode", this.paymentMode, this.terms);
    if (this.terms) {
      let sendData = {
        first_name: this.userData.firstname,
        last_name: this.userData.lastname,
        email: this.userData.email,
        billing_name: this.userData.billing_name,
        billing_address: this.userData.billing_address,
        billing_contact: this.userData.billing_contact,
        billing_city: this.userData.billing_city,
        billing_state: this.userData.billing_state,
        billing_pincode: this.userData.billing_pincode,
        billing_country: this.userData.billing_country,
        shipping_city: this.userData.shipping_city,
        shipping_address: this.userData.shipping_address,
        shipping_name: this.userData.shipping_name,
        shipping_country: this.userData.shipping_address,
        shipping_contact: this.userData.shipping_address,
        shipping_state: this.userData.shipping_state,
        shipping_pincode: this.userData.shipping_address,
        tracking_code: this.userData.shipping_address,
        default_currency: this.currency.currency_symbol,
        shipping_method: this.userData.shipping_address,
        orderstatus: 1,
        paymentmode: 1,
        transaction_id: ''
      };
      if (this.paymentMode == "ccavenue") {
        let form: any = document.getElementById("CCAvenueForm");
        form.submit();
      }

    } else {
      this.toasterService.show("Please read and accept the terms and conditions to proceed with your order.", 'warning');
    }
    // this.orderService.submitOrder(sendData).subscribe((res: any) => {
    //   if (res.value) {
    //     this.orderPlaced = true;
    //     this.cartService.cartCount.emit(0);
    //   }
    // })
  }

  billingFrmSubmit(data) {
    console.log("data", data);
    let billing: any = document.getElementById("billingAddressId");
    if (billing) {
      billing.classList.remove("active");
      this.billingActivate = true;
    }
    let shipping: any = document.getElementById("shippingAddressId");
    if (shipping) {
      shipping.classList.add("active");
    }
  }

  shippingFrmSubmit(data) {
    console.log("data", data);
    this.placeOrder = true;
    let shipping: any = document.getElementById("shippingAddressId");
    if (shipping) {
      shipping.classList.remove("active");
      this.shippingActivate = true;
    }
    let payment: any = document.getElementById("paymentMethodId");
    if (payment) {
      payment.classList.add("active");
      this.paymentActivate = true;
    }
  }

  validateActivate(accordianActivate) {
    if (this.billingActivate && accordianActivate == "billing") {
      let billing: any = document.getElementById("billingAddressId");
      if (billing && billing.classList.contains("active")) {
        billing.classList.remove("active");
      } else {
        billing.classList.add("active");
      }
    }
    if (this.shippingActivate && accordianActivate == "shipping") {
      let shipping: any = document.getElementById("shippingAddressId");
      if (shipping && shipping.classList.contains("active")) {
        shipping.classList.remove("active");
      } else {
        shipping.classList.add("active");
      }
    }

    if (this.paymentActivate && accordianActivate == "payment") {
      let payment: any = document.getElementById("paymentMethodId");
      if (payment && payment.classList.contains("active")) {
        payment.classList.remove("active");
      } else {
        payment.classList.add("active");
      }
    }
  }

  getCartData() {
    this.cartService.getCartData().subscribe((result: any) => {
      this.TotalItemsInCart = result.TotalItemsInCart ? result.TotalItemsInCart : 0;
      console.log("resulttt", result, this.TotalItemsInCart)
      if (result && result.data && result.data.length > 0) {
        this.cartData = result.data;
        this.tempTotalArray = [];
        this.cartData.forEach(element => {
          // let eachElementPrice = parseInt(element.price);
          let eachElementPrice = parseFloat(element.quantity) * parseFloat(element.price);
          this.tempTotalArray.push(eachElementPrice);
        });
        this.orderTotal = _.sum(this.tempTotalArray);
      } else {
        this.cartData = [];
        this.tempTotalArray = [];
        this.orderTotal = _.sum(this.tempTotalArray);
      }
      let billing: any = document.getElementById("billingAddressId");
      if (billing) {
        billing.classList.add("active");
      }
    }, (error: any) => {
      console.log(error.message);
    });
  }

  nextClicked() {
    let element = document.getElementsByName("radacc");
    if (element && element.length > 0) {
      element.forEach((result: any) => {
        result.checked = !result.checked;
      });
    }
  }

}
