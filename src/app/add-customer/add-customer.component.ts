import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // Importamos el servicio CRUD
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  public customerForm: FormGroup;  // Definicion del grupo para formulario Reactivo
  BirthDate:Date;

  constructor(
    public crudApi: CrudService,  // CRUD API
    public fb: FormBuilder,       // variable del tipo ReactiveForm
    public toastr: ToastrService  // Mensajes
  ) { }

  ngOnInit() {
    this.crudApi.GetCustomersList();  // tencion de la lista de clientes
    this.customeForm();              // Llamada al componente
    this.BirthDate = new Date();
  }

  // Reactive Form de Clientes
  customeForm() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateLocation: [''],
      dateBirth: [''],
      dateGenre: [''],
      customerState: [''],
    })  
  }

  

  // obtencion de la informacion del componente con FormName
  get firstName() {
    return this.customerForm.get('firstName');
  }

  get lastName() {
    return this.customerForm.get('lastName');
  }  

  get email() {
    return this.customerForm.get('email');
  }

  get mobileNumber() {
    return this.customerForm.get('mobileNumber');
  }

  get dateLocation() {
    return this.customerForm.get('dateLocation');
  }

  get dateBirth() {
    return this.customerForm.get('dateBirth');
  }

  get dateGenre() {
    return this.customerForm.get('dateGenre');
  }

  get customerState() {
    return this.customerForm.get('customerState').value;
  }


  // Reiniciar los valores en la interfaz
  ResetForm() {
    this.customerForm.reset();
  }  
 
  submitCustomerData() {

    //this.crudApi.addEmail();

    this.crudApi.AddCustomer(this.customerForm.value); // Llamada del submit en el formulario
    this.toastr.success(this.customerForm.controls['firstName'].value + ' successfully added!'); 
    this.ResetForm();  // Llamada al metodo reset
   };

}