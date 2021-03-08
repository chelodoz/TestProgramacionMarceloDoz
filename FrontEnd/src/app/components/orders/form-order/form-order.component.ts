import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Order } from 'src/app/models/order';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {
  form: FormGroup;
  suscription : Subscription;
  order: Order;
  constructor(private formBuilder: FormBuilder,
    public orderService : OrderService,
    public employeeService: EmployeeService,
    public customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group({
      orderId:[1, [Validators.required,Validators.min(1)]],
      employeeId: [0, [Validators.required,Validators.min(1)]],
      customerId: [0, [Validators.required,Validators.min(1)]],
      orderTotalPrice: [0, [Validators.required,Validators.min(1)]],
    })
   }

  ngOnInit(): void {
    this.employeeService.getEmployees();
    this.customerService.getCustomers();

   
    this.suscription=this.orderService.getOrder$().subscribe(data=>{
      
        this.order = data;
//console.log("valor de patch",this.order);
  //      console.log("valor de patch",this.order.orderTotalPrice);
        
        
        this.form.patchValue({
          orderTotalPrice : this.order.orderTotalPrice,
    
        });
     //   console.log("form",this.form.value  );
      });
    
    
  }
/*
  updateTotal(){
    
   var x= this.orderService.orderItems.reduce((prev,curr)=>{
      return prev+(curr.productUnitPrice*curr.orderQuantity)
    },0);
    console.log("updateTotal",x);

  }
*/

asd(){
  
}

 createOrder(){

  const order : Order={
    customerId : this.form.get('customerId').value,
    employeeId : this.form.get('employeeId').value,
    orderSaleDate : new Date(Date.now()),
    orderTotalPrice : this.form.get('orderTotalPrice').value,
  }

  this.orderService.updateOrder(order);
  this.orderService.saveOrder().subscribe(data =>{
    this.toastr.success('Order created succesfully');
 
    this.form.reset();
    this.router.navigate(['/orders'])
  })
  

  console.log("createOrder",order);
 }
}
