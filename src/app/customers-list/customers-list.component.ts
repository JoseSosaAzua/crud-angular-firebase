import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  
import { Customer } from './../shared/customer'; 
import { ToastrService } from 'ngx-toastr';      

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  p: number = 1;                        // Inicializacion de la paginacion
  Customer: Customer[];                 // Creacion del array para guardar la lista JSON
  hideWhenNoCustomer: boolean = false;  // Ocultar datos de la lista que no cumplan el rmatofo
  noData: boolean = false;              // variable para identificar si hay informacion en la base de datos
  preLoader: boolean = true;            // Animacion de inicio
  


  constructor(
    public crudApi: CrudService, // Servicio CRUD
    public toastr: ToastrService 
  ) { }

  ngOnInit() {
    this.dataState(); // Lista de informacion
    let s = this.crudApi.GetCustomersList(); 
    s.snapshotChanges().subscribe(data => { 
      this.Customer = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Customer.push(a as Customer);
      })
    })
  }

  // Identificacion del estado de la informacion
  dataState() {     
    this.crudApi.GetCustomersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoCustomer = false;
        this.noData = true;
      } else {
        this.hideWhenNoCustomer = true;
        this.noData = false;
      }
    })
  }

  // Metodo para eliminar el registro
  deleteCustomer(customer) {
    if (window.confirm('Desea eliminar al clientee ?')) { // Preguntar si se elimina JS
      this.crudApi.DeleteCustomer(customer.$key) // Llamada al metodo eliminar
      this.toastr.success(customer.firstName + ' Eliminado correctamente!'); // Info
    }
  }

}