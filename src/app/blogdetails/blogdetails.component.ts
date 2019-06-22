import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.less']
})
export class BlogdetailsComponent implements OnInit {
  blogData: any;
  index: any;
  configBlog: any = {
    direction: "horizontal",
    slidesPerView: "1",
    observer: true,
    effect: "slide",
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  };

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getBlogData(params["id"]);
    });
  }

  getBlogData(id) {
    this.blogService.getBlogDataById(id).subscribe((res: any) => {
      this.blogData = res.data
    }, err => console.log(err));
  }

  applyCss(data) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
}
