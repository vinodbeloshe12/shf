import { Component, OnInit } from "@angular/core";
import { HomeService } from "src/app/services/home.service";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from "ngx-gallery";
import { imgUrl } from "../app.constants";
@Component({
  selector: "app-swiper",
  templateUrl: "./swiper.component.html",
  styleUrls: ["./swiper.component.less"]
})
export class SwiperComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: any = [];
  // galleryImages: NgxGalleryImage[];
  sliderData: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getAllSlider();
    this.galleryOptions = [
      {
        imageAnimation: NgxGalleryAnimation.Fade,
        width: "100%",
        height: "65vh",
        imageDescription: true,
        imageArrowsAutoHide: true,
        imageAutoPlay: true,
        imageAutoPlayInterval: 8000,
        imageAutoPlayPauseOnHover: true,
        imageInfinityMove: true,
        thumbnails: false,
        lazyLoading: false
      }
    ];
  }

  getUrl(val) {
    if (val.includes("http")) {
      return val;
    } else {
      return "assets/images/" + val;
    }
  }
  getAllSlider() {
    this.homeService.getAllSlider().subscribe(
      (res: any) => {
        this.sliderData = res.data;
        this.sliderData.forEach(element => {
          this.galleryImages.push({
            small: imgUrl + element.link,
            medium: imgUrl + element.link,
            big: imgUrl + element.link,
            description: element.description
          });
        });
      },
      err => console.log(err)
    );
  }
}
