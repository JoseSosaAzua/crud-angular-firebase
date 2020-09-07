import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


const routes: Routes = [
  { path: '', redirectTo: '/register-customer', pathMatch: 'full' },
  { path: 'register-customer', component: AddCustomerComponent },
  { path: 'view-customers', component: CustomersListComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
