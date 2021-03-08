import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { OrderDetail } from '../models/orderdetail';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/Orders/';
  list : Order[];
  /*
  order: Order= {
    customerId : null,
    employeeId : null,
    orderSaleDate : null,
    orderTotalPrice: null
  };*/
  orderDetail : OrderDetail[]=[];

  private order = new BehaviorSubject<Order>({
    customerId : null,
    employeeId : null,
    orderSaleDate : null,
    orderTotalPrice: null
  } as any);


  orderItems = [];
  total : number=0;

  constructor(private http: HttpClient) { }

  test(){
    console.log("orderitems",this.orderItems);
  }

 

  updateTotal(){

    let x : Order={
      customerId : null,
    employeeId : null,
    orderSaleDate : null,
    orderTotalPrice: this.orderItems.reduce((prev,curr)=>{
      return parseFloat(prev.toFixed(2))+( parseFloat((curr.productUnitPrice*curr.orderQuantity).toFixed(2)))
    },0)
    }
    
    this.order.next(x);

    console.log("test",x);
     console.log("updateTotal",this.order);
     console.log("array",this.orderDetail);
 
   }
  
   saveOrder(): Observable<Order> {
    console.log("valor de order en service",this.order.value);
    console.log("vaor de orderDetail en service",this.orderDetail);
     var body ={
       ...this.order.value,
       OrderDetails : this.orderDetail
     }
     console.log("body",body);
    return this.http.post<Order>(this.myAppUrl + this.myApiUrl, body);
  }
  getOrders(){
    this.http.get<Order>(this.myAppUrl + this.myApiUrl).toPromise()
       .then(data =>{
         this.list = data as unknown as Order[];
       });
   }

  //get and update order BehaviorSubject
  getOrder$():Observable<Order>{
    return this.order.asObservable();
  }
  updateOrder(order){
    this.order.next(order);
  }
  
 
}
