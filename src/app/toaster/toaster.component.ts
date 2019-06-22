import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.less']
})
export class ToasterComponent implements OnDestroy {
  message: any = {};
  subscription: Subscription;
  showToaster: boolean = false;

  constructor(private toasterService: ToasterService) {
    // subscribe messages

    this.subscription = this.toasterService.getMessage().subscribe(message => {
      console.log("aaaaaaa", message)
      this.message = message;
      this.showToaster = true;
      setTimeout(() => {
        this.showToaster = false;
      }, 2000);
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
