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

  suscription: Subscription;
  customer: Customer;
  customerId = 0;

  dniRegExp: RegExp = /^\d{8}(?:[-\s]\d{4})?$/;

  form: FormGroup = this.fb.group({
    customerId: 0,
    customerFirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    customerLastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    customerDni: ['', [Validators.required, Validators.pattern(this.dniRegExp)]],
    customerCreditCard: ['', [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]],
    customerBirthDate: ['', [Validators.required, Validators.minLength(10)]],

  })

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.suscription = this.customerService.getCustomer().subscribe(customer => {

      this.customer = customer;


      this.form.patchValue({
        customerFirstName: this.customer.customerFirstName,
        customerLastName: this.customer.customerLastName,
        customerDni: this.customer.customerDni,
        customerCreditCard: this.customer.customerCreditCard
      });

      if (this.customer.customerBirthDate) {
        this.form.patchValue({
          customerBirthDate: new Date(this.customer.customerBirthDate).toLocaleDateString('fr-CA')
        });
      }
      if (this.customer.customerId != 0) {
        this.customerId = this.customer.customerId;
      }

    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  saveCustomer() {
    if (this.customerId === 0) {
      this.addCustomer();
    }
    else {
      this.editCustomer();
    }


  }

  addCustomer() {

    const customer: Customer = {
      customerFirstName: this.form.get('customerFirstName').value,
      customerLastName: this.form.get('customerLastName').value,
      customerDni: this.form.get('customerDni').value,
      customerCreditCard: this.form.get('customerCreditCard').value,
      customerBirthDate: this.form.get('customerBirthDate').value
    }
    this.customerService.saveCustomer(customer).subscribe(data => {
      this.toastr.success('Save succesfully');
      this.customerService.getCustomers();
      this.form.reset();
    })

  }

  editCustomer() {
    const customer: Customer = {
      customerId: this.customerId,
      customerFirstName: this.form.get('customerFirstName').value,
      customerLastName: this.form.get('customerLastName').value,
      customerDni: this.form.get('customerDni').value,
      customerCreditCard: this.form.get('customerCreditCard').value,
      customerBirthDate: this.form.get('customerBirthDate').value
    };
    this.customerService.updateCustomer(this.customerId, customer).subscribe(data => {
      this.toastr.info('Updated succesfully');
      this.customerService.getCustomers();
      this.form.reset();
      this.customerId = 0;
    })
  }
  resetForm() {
    this.form.reset();
    this.customerId = 0;
  }


}
