import { Component, OnInit, ɵConsole } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { CartService } from '../services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  imageServer = imgUrl;
  searchTerm: any;
  searchData: any = [];
  tempTotalArray: any;
  showDropDown1: boolean = false;
  showDropDown2: boolean = false;
  selectedLanguage: string;
  cartData: any;
  cartTotal: any;
  selectedCurrency: any;
  selectedIndex: number = 0;
  selectedSubIndex: number;
  userData: any = {};
  navArr = [];
  localStorage = localStorage;
  cartUpdateCount: any = 0;
  currencies: any;
  currency: any;
  language: string = localStorage.getItem('language');
  hamburger: boolean = false;
  flags = ['INR', 'USD', 'AUD', 'CUD'];

  constructor(private navigationService: NavigationService, private toasterService: ToasterService, private loginService: LoginService, private homeService: HomeService, private router: Router, private cartService: CartService) {
    this.getCart();
    this.cartService.cartCount.subscribe((data: any) => {
      this.getCart();
      // this.cartData = this.cartService.cartData ? this.cartService.cartData : this.cartData;
      if (data) {
        this.cartUpdateCount = data;
      } else {
        this.cartUpdateCount = 0;
      }
    })
  }

  setHamburger() {
    this.hamburger = !this.hamburger;
  }
  getCart() {
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.value) {
        this.cartUpdateCount = data.TotalItemsInCart ? data.TotalItemsInCart : 0;
        this.cartData = data.data;
        this.tempTotalArray = [];
        this.cartData.forEach(element => {
          // let eachElementPrice = parseInt(element.price);
          let eachElementPrice = parseFloat(element.quantity) * parseFloat(element.price);
          this.tempTotalArray.push(eachElementPrice);
        });
        this.cartTotal = _.sum(this.tempTotalArray);
      } else {
        this.cartUpdateCount = 0;
      }
    })
  }

  getSearchAutocomplete(term) {
    this.navigationService.search(term.query).subscribe((res: any) => {
      console.log("in search", res);
      this.searchData = res.data;
    }, err => console.log(err));
  }

  goToSearch(data) {
    console.log("eve", data);
    this.searchTerm = "";
    this.router.navigate(["/details", data.id, data.name_english]);
  }

  selectMenuItem(i: number, path, subindex) {

    //mobile menu code
    if (i != this.selectedIndex) {
      this.showDropDown1 = true;
    } else {
      this.showDropDown1 = !this.showDropDown1;
    }
    //desktop code
    this.selectedIndex = i;
    if (this.navArr[i].subNavArr && this.navArr[i].subNavArr.length == 0) {
      this.hamburger = false;
      this.showDropDown1 = false;
      this.showDropDown2 = false;
      this.router.navigate([path]);
    }
    //mobile menu code
    else if (path == "" && subindex != undefined) {
      console.log("path ", path, i, this.selectedIndex, subindex)
      if (subindex != this.selectedSubIndex) {
        this.showDropDown2 = true;
      } else {
        this.showDropDown2 = !this.showDropDown2;
      }
      this.selectedSubIndex = subindex;
    }
    //desktop code
    else if (path != "" && subindex != undefined) {
      this.hamburger = false;
      this.showDropDown1 = false;
      this.showDropDown2 = false;
      this.router.navigate([path]);

    }
  }

  changeRoute(val) {
    this.hamburger = false;
    this.showDropDown1 = false;
    this.showDropDown2 = false;
    this.router.navigate([val]);
  }
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getNavigation();
    this.getCurrency();
    this.getLanguage();
  }

  getLanguage() {
    this.navigationService.getLanguage().subscribe((res: any) => {
      if (res && res.data) {
        this.selectedLanguage = res.data;
        localStorage.setItem("language", this.selectedLanguage);
        this.language = localStorage.getItem('language')
      }
    })
  }

  getNavigation() {
    this.navigationService.getNavigation().subscribe((res: any) => {
      if (res.value) {
        this.navArr = res.data;
        this.currencies = res.currency;
      }

    }, err => console.log(err));
  }

  changeLanguage(val) {
    this.navigationService.changeLanguage(val).subscribe((res: any) => {
      if (res.value) {
        console.log("language changed to", res.data);
        localStorage.setItem("language", res.data);
        this.selectedLanguage = res.data;
        location.reload();
      }
    }, err => console.log(err));
  }

  logout() {
    this.loginService.logout().subscribe((res: any) => {
      if (res.value) {
        localStorage.removeItem("userData");

        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getNavigation();
        this.getCurrency();
        this.getLanguage();
        this.router.navigateByUrl("/home");
      }
    }, err => console.log(err));
  }

  updateCurrency(currency) {
    this.navigationService.updateCurrency(currency).subscribe((res: any) => {
      if (res.value) {
        localStorage.setItem('currency', JSON.stringify(res.data))
        // localStorage.setItem('currency', res.data.currency_symbol == '₹' ? 'INR' : res.data.currency_symbol)
        window.location.reload();
      }
    }, error => console.log(error)
    )
  }

  getCurrency() {
    this.navigationService.getCurrency().subscribe((res: any) => {
      if (res && res.value && res.data) {
        this.currency = res.data;
        localStorage.setItem('currency', JSON.stringify(res.data))
        // this.currency = res.data.currency_symbol == '₹' ? 'INR' : res.data.currency_symbol;       
      }
    }, error => console.log("error getting currency")
    )
  }


  removeFromCart(cartData) {
    if (cartData && cartData.id) {
      this.cartService.deleteFromCart(cartData.id).subscribe((result: any) => {
        console.log("Item Deleted", result);
        if (result.value) {
          this.toasterService.show('Product removed successfully!', 'success');
          let count = result.TotalItemsInCart ? result.TotalItemsInCart : 0;
          this.cartService.cartCount.emit(count);
        } else {
          this.toasterService.show(result.message, 'warning');
        }

      }, (error: any) => {
        console.log(error.message);
      });
    }
  }

}
