import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  allorders: any = [];
  showloc: any;
  showfilter: any;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((result: any) => {
      if (result.value && result.data.length > 0) {
        this.allorders = result.data
      }
    }, error => {
      console.log(error.message);
    });
  }

  orderDetails(order) {
    if (order) {
      this.router.navigate(['/orderdetails/', order.id])
    }
  }

}
