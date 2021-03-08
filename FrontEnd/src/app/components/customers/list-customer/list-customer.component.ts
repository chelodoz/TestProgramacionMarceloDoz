import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  constructor(public customerService : CustomerService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.customerService.getCustomers();
  }
  deleteCustomer(id : number){
    if(confirm('Confirm delete action')){
      this.customerService.deleteCustomer(id).subscribe(data => {
        this.toastr.warning('Customer deleted');
        this.customerService.getCustomers();
      },
      error=>{
        this.toastr.error('Customer is attach to order','Cannot delete customer');
      })
    }
  }
  editCustomer(customer : Customer){
    this.customerService.updateCustomerForm(customer);
  }
}
