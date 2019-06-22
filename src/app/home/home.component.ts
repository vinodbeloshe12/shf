import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
import * as _ from 'lodash';
import { imgUrl } from '../app.constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  imageServer = imgUrl;
  homeData: any;
  index: number = 2;
  language: string = localStorage.getItem("language");
  // sliderData: any;
  configReview: any = {
    direction: "horizontal",
    slidesPerView: "1",
    // spaceBetween: 30,
    observer: true,
    effect: "slide",
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  };
  faqData: any;
  lastAccordianIndex: number = 0;

  constructor(private homeService: HomeService, private router: Router, private faqService: FaqService) { }

  ngOnInit() {
    this.getHomePageData();
    this.getFAQ();
    window.scrollTo(0, 0);
  }

  setAccordion(i: number) {
    let element = document.getElementsByClassName("accordion");
    if (element) {
      element[this.lastAccordianIndex].classList.remove("active");
      if (element[i].classList.contains("active")) {
        element[i].classList.remove("active");
      } else {
        element[i].classList.add("active");
        this.lastAccordianIndex = i;
      }
    }
  }

  getFAQ() {
    this.faqService.getFAQ().subscribe((res: any) => {
      if (res.value) {
        this.faqData = _.groupBy(res.data, 'type');
        this.faqData = this.faqData[1];
      }
    }, err => console.log(err));
  }

  getHomePageData() {
    this.homeService.getHome().subscribe((res: any) => {
      this.homeData = res;
      console.log("respo", res)
    }, err => console.log(err));
  }

  goToListing(val) {
    this.router.navigate(['/listing', val]);
  }

  goToContent(val) {
    this.router.navigate(['/Content', val]);
  }
}
