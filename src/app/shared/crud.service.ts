import { Injectable } from '@angular/core';
import { Customer } from '../shared/customer';  // Importacion de la clase customer
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Importacion de los modulos firebase
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  customersRef: AngularFireList<any>;    // Creacion de la lista JSSON
  customerRef: AngularFireObject<any>;   // Creacion del objeto JSON

  constructor(private db: AngularFireDatabase) { }

  // Metodo para añadir cliente
  AddCustomer(customer: Customer) {
    this.customersRef.push({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      dateLocation: customer.dateLocation,
      dateBirth: customer.dateBirth,
      dateGenre: customer.dateGenre,
      customerState: customer.customerState
    })
  }

  //Metodo para añadir un segundo correo NO TERMINADO

  addEmail() {
    const ref = firebase.database().ref('/customers-list/-MG_i8bpZeHYFTawQeoW').push();
    ref.set({
        email1: 'hola123',
    });

  }


getCustomersFromKeys(key){
  
}


  // Obtencion de registro por ID
  GetCustomer(id: string) {
    this.customerRef = this.db.object('customers-list/' + id);
    return this.customerRef;
  }

  

  // Obtencion de datos JSON de la tabla customer-list en firebase
  GetCustomersList() {
    this.customersRef = this.db.list('customers-list');
    return this.customersRef;
  }  

  // Metodo actualizar
  UpdateCustomer(customer: Customer) {
    this.customerRef.update({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      dateLocation: customer.dateLocation,
      dateBirth: customer.dateBirth,
      dateGenre: customer.dateGenre,
      customerState: customer.customerState
    })
  }  

  // Metodo Eliminar
  DeleteCustomer(id: string) { 
    this.customerRef = this.db.object('customers-list/'+id);
    this.customerRef.remove();
  }
  
}