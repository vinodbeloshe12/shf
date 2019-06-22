import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { imgUrl } from '../app.constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
  blogData: any;
  imageServer = imgUrl;
  p: number;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getAllBlog();
  }

  getAllBlog() {
    this.blogService.getAllBlog().subscribe((res: any) => {
      this.blogData = res.data
    }, err => console.log(err));
  }

}
