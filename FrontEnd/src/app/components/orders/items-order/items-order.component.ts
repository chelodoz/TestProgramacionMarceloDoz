import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-items-order',
  templateUrl: './items-order.component.html',
  styleUrls: ['./items-order.component.css']
})
export class ItemsOrderComponent implements OnInit {

  constructor(public orderService : OrderService) { }

  ngOnInit(): void {
    

  }

  deleteItem(id : number){
    var objIndex = this.orderService.orderItems.findIndex(item => item.productId == id);
    this.orderService.orderItems.splice(objIndex, 1);
    this.orderService.orderDetail.splice(objIndex, 1);
    this.orderService.updateTotal();

    
  }
}
