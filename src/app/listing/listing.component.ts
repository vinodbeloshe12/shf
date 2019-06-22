import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ListingService } from 'src/app/services/listing.service';
import { CartService } from '../services/cart.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.less']
})
export class ListingComponent implements OnInit {
  imageServer = imgUrl;
  params: any;
  listingData: any = [];
  currency: any = JSON.parse(localStorage.getItem('currency'));
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService,
    private cartService: CartService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
      this.getCategoryDetailsByName(this.params.name);
    });
  }



  getCategoryDetailsByName(name) {
    this.listingService.getCategoryDetailsByName(name).subscribe((res: any) => {
      if (res.value) {
        this.getListingData(res.data.id);
      } else {
        this.listingData = [];
      }
    }, err => console.log(err));

  }

  getListingData(id) {
    this.listingService.getListingData(id).subscribe((res: any) => {
      if (res.value) {
        this.listingData = res.data;
      } else {
        this.listingData = [];
      }
    }, err => console.log(err));
  }

  goToDetails(data) {
    console.log("datago to details", data);
    this.router.navigate(["/details", data.product_id, data.name_english]);
  }

  checkCartProduct(data) {
    this.cartService.checkCartData(data.product_id).subscribe((result: any) => {
      console.log("result add to cart", result);
      if (result.value) {
        // update cart
        let sendObj = {
          "id": result.data.id,
          "product_id": result.data.product_id,
          "quantity": parseInt(result.data.quantity) + 1
        }
        this.updateCart(sendObj)
      } else {
        // add to cart
        this.addToCart(data);
      }

    }, (error: any) => {
      console.log(error.message);
    });
  }

  addToCart(data) {
    if (data) {
      let cartData = {
        "product_id": data.product_id,
        "quantity": "1"
      }

      this.cartService.addToCart(cartData).subscribe((result: any) => {
        console.log("result add to cart", result);
        if (result.value) {
          let count = result.TotalItemsInCart ? result.TotalItemsInCart : 0;
          this.cartService.cartCount.emit(count);
          this.toasterService.show('Product added to cart', 'success');
        } else {
          this.toasterService.show(result.message, 'warning');
        }

      }, (error: any) => {
        console.log(error.message);
      });
    }
  }


  updateCart(data) {
    this.cartService.updateCart(data).subscribe((result: any) => {
      console.log("data update", result);
      if (result.value) {
        let count = result.TotalItemsInCart ? result.TotalItemsInCart : 0;
        this.cartService.cartCount.emit(count);
        this.toasterService.show('Product added to cart', 'success');
      } else {
        this.toasterService.show(result.message, 'warning');
      }
    }, (error: any) => {
      console.log(error.message);
    });

  }

}
