import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
   forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [ Validators.required, Validators.minLength(5) ]],
      apellido: ['', Validators.required],
      correo: ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
        // [], [], [], []

      ])
    });

  }
    // Setear datos a los campos que viene de un api por decirlo
  cargarDataAlFormulario(){
    //this.forma.setValue({
    this.forma.reset({
      nombre: 'Eiderson',
      apellido: 'Valverde',
      correo: 'eider@gmail.com',
      direccion: {
        distrito: 'Ibanes',
        ciudad: 'El tolno'
      }
    });

    // Una manera de cargar data a la tabla de inicio
     // ===>> la otra manera es usar setValue, peo tienen q tener datos todos los atributos para evitar el error
    ['Comer', 'Dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor)));
  }

  agregarPasatiempo(): void {
    // this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required));
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempos( i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);
    if( this.forma.invalid) {
      return Object.values( this.forma.controls).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls).forEach( control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    // Posteo de info, reset de campos
    this.forma.reset({
      nombre: ''
    });
  }

}
