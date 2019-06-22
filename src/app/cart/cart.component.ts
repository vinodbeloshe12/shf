import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import * as _ from 'lodash';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  imageServer = imgUrl;
  cartData: any;
  orderTotal: number;
  TotalItemsInCart: number;
  tempTotalArray: any = [];
  cart: any;
  currency: any = JSON.parse(localStorage.getItem('currency'));

  // showButton = "Expand";
  // showOptionSearch: boolean;
  constructor(private cartService: CartService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    this.cartService.getCartData().subscribe((result: any) => {
      this.TotalItemsInCart = result.TotalItemsInCart ? result.TotalItemsInCart : 0;
      this.cartService.cartCount.emit(this.TotalItemsInCart);
      console.log("resulttt", result, this.TotalItemsInCart)
      if (result && result.data && result.data.length > 0) {
        this.cartData = result.data;
        this.tempTotalArray = [];
        this.cartData.forEach(element => {
          let eachElementPrice = parseFloat(element.quantity) * parseFloat(element.price);
          this.tempTotalArray.push(eachElementPrice);
        });
        this.orderTotal = _.sum(this.tempTotalArray);
      } else {
        this.cartData = [];
        this.tempTotalArray = [];
        this.orderTotal = _.sum(this.tempTotalArray);
      }
    }, (error: any) => {
      console.log(error.message);
    });
  }

  updateCartData(dataToUpdate, index) {
    if (dataToUpdate.quantity == null) {
      this.cartData[index].quantity = dataToUpdate.quantity;
      return;
    }
    if (dataToUpdate.quantity == 0) {
      this.cartData[index].quantity = 1;
    }
    if (dataToUpdate && dataToUpdate.quantity <= dataToUpdate.stock) {
      let data = {
        "id": dataToUpdate.id ? dataToUpdate.id : "",
        "product_id": dataToUpdate.product_id,
        "quantity": dataToUpdate.quantity ? dataToUpdate.quantity : 1
      }
      this.cartService.updateCart(data).subscribe((result: any) => {
        if (result.value) {
          this.toasterService.show('Cart data updated successfully!', 'success');
        } else {
          this.toasterService.show(result.message, 'warning');
        }
        this.getCartData();
      }, (error: any) => {
        console.log(error.message);
      });
    } else {
      this.cartData[index].quantity = parseInt(dataToUpdate.stock);
      this.toasterService.show("Only " + dataToUpdate.stock + " items in stock", 'warning');
    }
  }

  removeFromCart(cartData) {
    if (cartData && cartData.id) {
      this.cartService.deleteFromCart(cartData.id).subscribe((result: any) => {
        console.log("Item Deleted", result);
        if (result.value) {
          this.getCartData();
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
  // showMoreOption() {
  //   this.showOptionSearch = !this.showOptionSearch;
  //   if (this.showOptionSearch) {
  //     this.showButton = "Compress";
  //   } else {
  //     this.showButton = "Expand";
  //   }
  // }
}
