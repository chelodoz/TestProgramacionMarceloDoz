import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormEmployeeComponent } from './components/employees/form-employee/form-employee.component';
import { ListEmployeeComponent } from './components/employees/list-employee/list-employee.component';
import { FooterComponent } from './components/footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FormOrderComponent } from './components/orders/form-order/form-order.component';
import { ItemsOrderComponent } from './components/orders/items-order/items-order.component';
import { ProductSelectComponent } from './components/products/product-select/product-select.component';
import { ListOrderComponent } from './components/orders/list-order/list-order.component';
import { InvoicesComponent } from './components/invoices/invoices.component';


// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { CustomersComponent } from './components/customers/customers.component';
import { FormCustomerComponent } from './components/customers/form-customer/form-customer.component';
import { ListCustomerComponent } from './components/customers/list-customer/list-customer.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { FormProviderComponent } from './components/providers/form-provider/form-provider.component';
import { ListProviderComponent } from './components/providers/list-provider/list-provider.component';
import { RemoveCommaPipe } from './components/pipes/remove-comma.pipe'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    FormEmployeeComponent,
    ListEmployeeComponent,
    FooterComponent,
    NavbarComponent,
    ProductsComponent,
    OrdersComponent,
    FormOrderComponent,
    ItemsOrderComponent,
    ProductSelectComponent,
    ListOrderComponent,
    InvoicesComponent,
    FormProductComponent,
    ListProductComponent,
    CustomersComponent,
    FormCustomerComponent,
    ListCustomerComponent,
    ProvidersComponent,
    FormProviderComponent,
    ListProviderComponent,
    RemoveCommaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
