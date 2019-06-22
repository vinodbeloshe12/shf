import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
// import { RatingModule } from "ng2-rating";
import { Router, ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { CartService } from '../services/cart.service';
import { ReviewService } from 'src/app/services/review.service';
import * as _ from 'lodash';
import { SwiperComponent } from '../swiper/swiper.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  currency: any = JSON.parse(localStorage.getItem('currency'));
  productDetailImages: any;
  productDetailsData: any;
  urlData: number;
  tabsIndex: number = 1;
  review: boolean;
  reviewData: any = {};
  enquiryData: any = {};
  description: boolean;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: any = [];
  productQuantity: any = 1;
  emailValidate: boolean = false;
  averageOfAllRatings: any;
  meanValueArray: any = [];
  averageRating: any;
  fiveStars: any;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  config: any = {};
  zoomImage: any;
  locationURL: any;
  selectedIndex: number = 0;
  imageServer = imgUrl;
  constructor(private router: Router,
    private route: ActivatedRoute,
    public detailsService: DetailsService,
    public cartService: CartService,
    private reviewService: ReviewService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {

    this.config = {
      direction: 'horizontal',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      autoplayDisableOnInteraction: false,
      effect: 'slide',
      slidesPerView: 4,
      spaceBetween: 10,
      slidesPerGroup: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
    this.route.params.subscribe(params => {
      this.urlData = params['product_id'];
      this.enquiryData.product_id = params['product_id'];
      console.log("this.urlData", this.urlData);
      this.getDetailsofProduct(this.urlData);
      this.locationURL = location.href;
    });


    this.activetabone();
  }

  pushImageToContainer(image) {
    this.zoomImage = this.imageServer + image;
  }


  changeRating(val) {
    console.log(val);
    this.reviewData.rating = val;
  }

  submitRating(data, event) {
    if (data && data.email) {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(data.email) == false) {
        this.emailValidate = true;
        return false;
      }
      else {
        this.emailValidate = false;
      }
    }
    if (event && event.type === "submit") {
      data.product_id = this.urlData;
      data.rating = this.reviewData.rating ? this.reviewData.rating : 1;
      console.log("ddd", data);

      this.reviewService.addReview(data).subscribe((res: any) => {
        if (res.value) {
          this.getDetailsofProduct(data.product_id);
          this.reviewData = {};
          // alert("Review submitted");
        } else {
          // alert(res.message);
        }
      }, err => console.log(err));
    }
  }


  submitEnquiry(data, event) {
    console.log("data", data);
    if (data && data.email) {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(data.email) == false) {
        this.emailValidate = true;
        return false;
      }
      else {
        this.emailValidate = false;
      }
    }
    if (event && event.type === "submit") {
      this.reviewService.submitEnquiry(data).subscribe((res: any) => {
        if (res.value) {
          this.enquiryData = {};
          // alert("Review submitted");
          this.toasterService.show('We will get back you shortly', 'success');
        } else {
          // alert(res.message);
          this.toasterService.show('Something went wrong!', 'warning');
        }
      }, err => console.log(err));
    }
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

  selectTab(i: number) { this.tabsIndex = i }

  activetabone() {
    this.description = true;
    this.review = false;
  }
  activetabtwo() {
    this.review = true;
    this.description = false;
  }

  getDetailsofProduct(productId) {

    this.detailsService.getProductDetails(productId).subscribe((res: any) => {
      if (res.value) {
        console.log("res.val", res.value);
        this.productDetailsData = res;
        this.averageRating = 0;
        this.fiveStars = 0;
        this.fourStars = 0;
        this.threeStars = 0;
        this.twoStars = 0;
        this.oneStar = 0;
        this.averageRating = _.round(_.meanBy(this.productDetailsData.reviews, function (result) {
          return parseInt(result.rating);
        }));
        let fiveStarAverage = [];
        let fourStarAverage = [];
        let threeStarAverage = [];
        let twoStarAverage = [];
        let oneStarAverage = [];
        this.productDetailsData.reviews.forEach(element => {
          switch (parseInt(element.rating)) {
            case 1:
              oneStarAverage.push(1);
              break;
            case 2:
              twoStarAverage.push(1);
              break;
            case 3:
              threeStarAverage.push(1);
              break;
            case 4:
              fourStarAverage.push(1);
              break;
            case 5:
              fiveStarAverage.push(1);
              break;

            default:
              break;
          }
        });
        this.fiveStars = _.round(((fiveStarAverage.length / this.productDetailsData.reviews.length) / 20) * 20, 2);
        this.fiveStars = this.fiveStars > 0 ? this.fiveStars + 1 : 0
        this.fourStars = _.round(((fourStarAverage.length / this.productDetailsData.reviews.length) / 20) * 20, 2);
        this.fourStars = this.fourStars > 0 ? this.fourStars + 1 : 0
        this.threeStars = _.round(((threeStarAverage.length / this.productDetailsData.reviews.length) / 20) * 20, 2);
        this.threeStars = this.threeStars > 0 ? this.threeStars + 1 : 0
        this.twoStars = _.round(((twoStarAverage.length / this.productDetailsData.reviews.length) / 20) * 20, 2);
        this.twoStars = this.twoStars > 0 ? this.twoStars + 1 : 0
        this.oneStar = _.round(((oneStarAverage.length / this.productDetailsData.reviews.length) / 20) * 20, 2);
        this.oneStar = this.oneStar > 0 ? this.oneStar + 1 : 0
        // console.log("reviews of average", this.averageRating);
        // console.log("reviews of average", this.meanValueArray);
        // this.galleryImages = [];
        // res.images.forEach(element => {
        //   this.galleryImages.push({
        //     small: element.image_name,
        //     medium: element.image_name,
        //     big: element.image_name
        //   })
        // });
        this.zoomImage = this.imageServer + this.productDetailsData.images[0].image_name;
        console.log("deatils of product in detail page", this.productDetailsData.images, this.productDetailsData.data);
      }
      else {
        console.log("Something went wrong");
      }

    }, error => console.log("Error for Product details", error));
  }

  getDetail(data) {
    this.router.navigate(["/details", data.id, data.name]);
  }

  addToCart() {

    let cartData = {
      "product_id": this.urlData,
      "quantity": this.productQuantity
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

  quantityChange(quantity, stock) {
    if (quantity > parseInt(stock)) {
      this.toasterService.show("Only " + stock + " items in stock", 'warning');
      this.productQuantity = stock;
    } else {
      return false;
    }
  }
}
