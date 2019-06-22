import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.less']
})
export class FaqsComponent implements OnInit {
  faqData: any;
  selectedIndex;
  showAccordianA: boolean;
  showAccordianB: boolean;
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    // Add id's to array for which question accordian you want to open the div by default.

    this.getFAQ();
  }

  openAccordian(type, index) {
    if (type == 'a') {
      if (this.selectedIndex != index) {
        this.showAccordianA = true;
      }
      else {
        this.showAccordianA = !this.showAccordianA;
      }
      this.showAccordianB = false;
    } else {
      if (this.selectedIndex != index) {
        this.showAccordianB = true;
      }
      else {
        this.showAccordianB = !this.showAccordianB;
      }
      this.showAccordianA = false;
    }
    this.selectedIndex = index;
  }

  getFAQ() {
    this.faqService.getFAQ().subscribe((res: any) => {
      if (res.value) {
        this.faqData = _.groupBy(res.data, 'type');
        console.log("faqData", this.faqData);

      }
    }, err => console.log(err));
  }
}
