import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProvidersComponent } from './components/providers/providers.component';


const routes: Routes = [
  { path: '',component:EmployeesComponent},
  { path: 'products',component:ProductsComponent},
  { path: 'new-order',component:OrdersComponent},
  { path: 'orders',component:InvoicesComponent},
  { path: 'customers',component:CustomersComponent},
  { path: 'providers',component:ProvidersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
