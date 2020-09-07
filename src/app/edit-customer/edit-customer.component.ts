import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; 
import { Location } from '@angular/common';  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editForm: FormGroup;  // Definicion del formulario reactivo

  constructor(
    private crudApi: CrudService,       // CRUD API
    private fb: FormBuilder,            // Formulario Reactivo
    private location: Location,         
    private actRoute: ActivatedRoute,   
    private router: Router,             
    private toastr: ToastrService      
  ) { }

  ngOnInit() {
    this.updateCustomerData();   // Llamada al metodo actualizar al inicializar el componente 
    const id = this.actRoute.snapshot.paramMap.get('id');  // 
    this.crudApi.GetCustomer(id).valueChanges().subscribe(data => {
      
    this.editForm.setValue(data);   // Poblacion del formulario
    console.log(data);
    
    });

  }

  // Obtencion de la informacion con FormName
  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }  

  get dateLocation() {
    return this.editForm.get('dateLocation');
  }

  get dateBirth() {
    return this.editForm.get('dateBirth');
  }

  get dateGenre() {
    return this.editForm.get('dateGenre');
  }

  get customerState() {
    return this.editForm.get('customerState').value;
  }

  // Controles en el formulario Reactivo y sus validaciones
  updateCustomerData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateLocation: [''],
      dateBirth: [''],
      dateGenre: [''],
      customerState: ['']
    })
  }

  // Metodo para regresar
  goBack() {
    this.location.back();
  }

  // Metodo para actualizar
  updateForm(){
    this.crudApi.UpdateCustomer(this.editForm.value);       // Llamada al metodo actualizar en CRUD API
    this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');   
    this.router.navigate(['view-customers']);               // Ruta a la vista de tabla
  }

}