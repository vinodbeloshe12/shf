import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import * as _ from 'lodash';
import { ToasterService } from '../services/toaster.service';
import { imgUrl } from '../app.constants';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.component.html',
  styleUrls: ['./photogallery.component.less']
})

export class PhotogalleryComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    let catContainer: any = document.getElementsByClassName("catContainer")[0];
    if (catContainer && window.pageYOffset > 50) {
      catContainer.style.top = '150px';
    } else {
      catContainer.style.top = null;
    }
  }
  imageServer = imgUrl;
  imagesArray: any;
  imageModal: boolean;
  clickedImage: any;
  currentIndex: any;
  categories: any;
  categoryIndex: any;
  desktopView: boolean;
  mobileView: boolean;
  firstImage: boolean;
  lastImage: boolean;
  constructor(private galleryService: GalleryService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.isView();
    this.galleryService.getImagesGallery().subscribe((res: any) => {
      if (res && res.value) {
        this.imagesArray = _(res.data)
          .groupBy('name_english')
          .map(function (items, categories) {
            return {
              category: categories,
              names: _.map(items, 'image_name')
            };
          }).value();
      }
    });
    // let mql = window.matchMedia("(orientation: portrait)");
    // let element: any = document.getElementById("categoryContainerMobileId");
    // // If there are matches, we're in portrait
    // if (mql.matches) {
    //   // Portrait orientation
    // } else {
    //   // Landscape orientation
    // }

    let model = this;
    window.addEventListener("orientationchange", function () {
      // Announce the new orientation number
      if (window.screen.width == 1024) {
        location.reload()
      }
      // let element: any = document.getElementById("categoryContainerMobileId");
      // if (element) {
      //   if (element.offsetWidth == 280 || element.offsetWidth == 0) {
      //     element.style.width = '230px';
      //     element.style.opacity = 1;
      //   }
      // }
    }, false);
  }

  isView() {
    if (window.innerWidth <= 812) {
      this.mobileView = true;
      this.desktopView = false;
    } else {
      this.mobileView = false;
      this.desktopView = true;
    }
  }

  openCategoriesMobile() {
    let element: any = document.getElementById("categoryContainerMobileId");
    if (element) {
      if (element.offsetWidth == 280) {
        element.style.width = '0px';
        element.style.opacity = 0;
      } else {
        element.style.width = '280px';
        element.style.opacity = 1;
      }
    }
  }

  photoGalleryClick() {
    let element: any = document.getElementById("categoryContainerMobileId");
    if (element && element.offsetWidth == 280) {
      element.style.width = '0px';
      element.style.opacity = 0;
    }
  }

  scrollToCategory(index) {
    let element = document.getElementById("categoryId" + index);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    let catContainer: any = document.getElementsByClassName("catContainer")[0];
    if (catContainer && index > 0) {
      catContainer.style.top = '150px';
    } else {
      let pageHeader = document.getElementsByTagName("body")[0];
      pageHeader.scrollIntoView({
        behavior: 'smooth'
      });
      setTimeout(() => {
        catContainer.style.top = null;
      }, 3000);
    }
  }

  openImage(categoryIndex, imageIndex) {
    this.clickedImage = "";
    this.currentIndex = imageIndex;
    this.categoryIndex = categoryIndex;
    this.imageModal = true;
    this.clickedImage = this.imageServer + this.imagesArray[categoryIndex].names[imageIndex];
    setTimeout(() => {
      let imageModalElement: any = document.getElementsByClassName("image-modal")[0];
      imageModalElement.classList.add("active");
      let bodyElement: any = document.getElementsByTagName("body")[0];
      bodyElement.classList.add("scroll-lock");
    }, 100);
  }

  closeModal() {
    let imageModalElement: any = document.getElementsByClassName("image-modal")[0];
    imageModalElement.classList.add("close");
    imageModalElement.classList.remove("active");
    setTimeout(() => {
      this.imageModal = false;
      let bodyElement: any = document.getElementsByTagName("body")[0];
      bodyElement.classList.remove("scroll-lock");
    }, 100);
  }

  previousImage() {
    this.lastImage = false;
    if (this.currentIndex > 0) {
      this.clickedImage = this.imageServer + this.imagesArray[this.categoryIndex].names[this.currentIndex - 1];
      this.currentIndex = this.currentIndex - 1;

    } else {
      if (this.categoryIndex - 1 == -1) {
        this.toasterService.show("Already on first Image.", 'warning');
        this.firstImage = true;
        return;
      }
      this.categoryIndex = this.categoryIndex - 1;
      this.currentIndex = this.imagesArray[this.categoryIndex].names.length;
      this.clickedImage = this.imageServer + this.imagesArray[this.categoryIndex].names[this.currentIndex - 1];
    }
  }

  nextImage() {
    this.firstImage = false;
    if (this.currentIndex < this.imagesArray[this.categoryIndex].names.length - 1) {
      this.clickedImage = this.imageServer + this.imagesArray[this.categoryIndex].names[this.currentIndex + 1];
      this.currentIndex = this.currentIndex + 1;

    } else {
      if (this.imagesArray.length == this.categoryIndex + 1) {
        this.toasterService.show("Already on last Image.", 'warning');
        this.lastImage = true;

        return;
      }
      this.categoryIndex = this.categoryIndex + 1;
      this.clickedImage = this.imageServer + this.imagesArray[this.categoryIndex].names[0];
    }
  }
}
