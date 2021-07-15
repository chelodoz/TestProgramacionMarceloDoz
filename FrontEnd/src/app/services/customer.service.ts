import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/Customers/';

  private _customers: Customer[];

  get customers() {
    return { ...this._customers };
  }

  list: Customer[];
  private updateForm = new BehaviorSubject<Customer>({
    customerId: 0,
  } as any);

  constructor(private http: HttpClient) { }



  //server querys
  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.myAppUrl + this.myApiUrl, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(this.myAppUrl + this.myApiUrl + id);
  }
  getCustomers() {
    this.http.get<Customer>(this.myAppUrl + this.myApiUrl)
      .pipe(
        map(resp => {
          console.log("Customers in service",resp)
          const customer = {
            customerId : resp.customerId,
            customerFirstName : resp.customerFirstName,
            customerLastName : resp.customerLastName,
            customerDni : resp.customerDni,
            customerBirthDate : resp.customerBirthDate,
            customerCreditCard: resp.customerCreditCard
          }
          this._customers.push({
            customerId : 1,
            customerFirstName : 'asd',
            customerLastName : 'asd',
            customerDni : 9989898,
            customerBirthDate : new Date(),
            customerCreditCard: 15          });
        })
      );
  }
  updateCustomer(id: number, Customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.myAppUrl + this.myApiUrl + id, Customer);

  }



  //get and update Customer form
  updateCustomerForm(customer) {
    this.updateForm.next(customer);
  }
  getCustomer(): Observable<Customer> {
    return this.updateForm.asObservable();
  }
}
