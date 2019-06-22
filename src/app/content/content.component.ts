import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {
  contentData: any;
  constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    // console.log("changes", this.activatedRoute.snapshot.paramMap.get("str"));
    this.activatedRoute.params.subscribe((params: any) => {
      this.getContent(params["str"]);
    });

  }

  getContent(title) {
    this.contentService.getContent(title).subscribe((res: any) => {
      this.contentData = res.data;
    }, err => console.log(err));
  }

  applyCss(data) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }

}
