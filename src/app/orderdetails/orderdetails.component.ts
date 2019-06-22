import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import * as jsPDF from "jspdf";
// import html2canvas from 'html2canvas';
import { imgUrl } from '../app.constants';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.less']
})
export class OrderdetailsComponent implements OnInit {
  shareData: any;
  imageServer = imgUrl;
  orderDetails: any;
  itemDetails: any;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute, private toasterService: ToasterService,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderItem(id).subscribe((result: any) => {
      if (result.value) {
        this.orderDetails = result.data;
        this.itemDetails = result.items;
        console.log("orderdetails", this.orderDetails);
        console.log("item details", this.itemDetails);
      }
    }, error => {
      console.log(error.message);
    });
  }

  createPdf() {
    document.getElementById('createPdf').style.display = 'block';
    // document.getElementById('createPdf').style.padding = '10px';
    if (document.getElementById('orderTotal')) {

      document.getElementById('orderTotal').style.display = 'block';
    }
    const elementBody = document.getElementById('createPdf');
    const footer = document.getElementById('orderTotal');
    let pdf = new jsPDF('a4');

    pdf.internal.scaleFactor = 5.5;

    const element = document.getElementById('createPdf');
    const w = element.clientWidth;
    const h = element.clientHeight;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = w * 2;
    newCanvas.height = h * 2;
    newCanvas.style.width = w + 'px';
    newCanvas.style.height = h + 'px';
    const context = newCanvas.getContext('2d');
    context.scale(2, 2);


    const element1 = document.getElementById('orderTotal');
    const w1 = element1.clientWidth;
    const h1 = element1.clientHeight;
    const newCanvas1 = document.createElement('canvas');
    newCanvas1.width = w1 * 2;
    newCanvas1.height = h1 * 2;
    newCanvas1.style.width = w + 'px';
    newCanvas1.style.height = h + 'px';
    const context1 = newCanvas1.getContext('2d');
    context1.scale(2, 2);

    pdf.addHTML(elementBody, 0, 0, { pagesplit: false, canvas: newCanvas }, () => {
      pdf.addHTML(footer, 0, 270, { canvas: newCanvas1 }, () => {
        // var out = pdf.output('dataurlnewwindow');
        pdf.save('order_' + this.orderDetails.id + '.pdf');
        document.getElementById('createPdf').style.display = 'none';
        if (document.getElementById('orderTotal')) {
          document.getElementById('orderTotal').style.display = 'none';
        }
      });
    });
  }

  updateOrderStatus(data) {
    let sendData = {
      id: data.id,
      orderstatus: data.orderstatus
    }
    this.orderService.updateOrderStatus(sendData).subscribe((res: any) => {
      if (res.value) {
        this.toasterService.show("Order Status Updated", "success");
      }
    }, err => console.log(err));
  }

  routeToDetails(productId, productName) {
    if (productId && productName) {
      this.router.navigate(['/details/' + productId + '/' + productName])
    }
  }
}


