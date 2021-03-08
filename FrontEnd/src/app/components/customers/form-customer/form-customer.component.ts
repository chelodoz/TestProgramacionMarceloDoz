import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  form: FormGroup;
  suscription : Subscription;
  customer : Customer;
  customerId = 0;

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      customerId:0,
      customerFirstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      customerLastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      customerDni: ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      customerCreditCard:['',[Validators.required,Validators.min(1000000000000000),Validators.max(9999999999999999)]],
      customerBirthDate : ['',[Validators.required,Validators.minLength(10)]],
      
    })
   }

  ngOnInit(): void {
    this.suscription=this.customerService.getCustomer$().subscribe(data=>{
      
      this.customer = data;
      
      
      this.form.patchValue({
        customerFirstName : this.customer.customerFirstName,
        customerLastName : this.customer.customerLastName,
        customerDni : this.customer.customerDni,
        customerCreditCard : this.customer.customerCreditCard
      });
      if(this.customer.customerBirthDate){
        this.form.patchValue({
        customerBirthDate : new Date(this.customer.customerBirthDate).toLocaleDateString('fr-CA')
      });
      }
      if(this.customer.customerId != 0){
        this.customerId = this.customer.customerId;
      }
      
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  saveCustomer(){
      console.log("id",this.customerId);
    if (this.customerId=== 0){
      this.add();
    }
    else{
      this.edit();
    }


  }

  add(){

    const customer : Customer = {
      customerFirstName : this.form.get('customerFirstName').value,
      customerLastName :  this.form.get('customerLastName').value,
      customerDni : this.form.get('customerDni').value,
      customerCreditCard : this.form.get('customerCreditCard').value,
      customerBirthDate :  this.form.get('customerBirthDate').value
      }
      this.customerService.saveCustomer(customer).subscribe(data =>{
        this.toastr.success('Save succesfully');
        this.customerService.getCustomers();
        this.form.reset();
      })
      
  }

  edit(){
    const customer : Customer = {
      customerId : this.customerId,
      customerFirstName : this.form.get('customerFirstName').value,
      customerLastName :  this.form.get('customerLastName').value,
      customerDni : this.form.get('customerDni').value,
      customerCreditCard : this.form.get('customerCreditCard').value,
      customerBirthDate :  this.form.get('customerBirthDate').value
      };
      this.customerService.updateCustomer(this.customerId,customer).subscribe(data => {
        this.toastr.info('Updated succesfully');
        this.customerService.getCustomers();
        this.form.reset();
        this.customerId= 0;
      })
  }

  test(){
    console.log(this.form.value);
  }
}
