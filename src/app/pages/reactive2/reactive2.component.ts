import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive2',
  templateUrl: './reactive2.component.html',
  styleUrls: ['./reactive2.component.css']
})
export class Reactive2Component implements OnInit {

  //========== PRUEBAS DE GIT ==============
  

  forma: FormGroup;
  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.cargarListener();
   }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2) ? false : true;
  }

  crearFormulario(): void{
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
        //[], [], []
      ])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  cargarListener(){
    //Todo el formulario
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // El Status
    // this.forma.statusChanges.subscribe( status => console.log({status}));

    // Para un solo campo, o tambien para el Status ('nombre').status....
      this.forma.get('nombre').valueChanges.subscribe( console.log);
  }

  cargarDataAlFormulario(){
    //this.forma.setValue({
    this.forma.reset({
      nombre: 'Eiderson',
      apellido: 'Valverde',
      correo: 'eider@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Ibanes',
        ciudad: 'El tolno'
      }
    });

    ['Comer','Dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor)));
  }

  agregarPasatiempo(): void {
    // this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required));
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempos( i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar() {
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
    // Limpiar campos, reset de campos
    this.forma.reset({
      nombre: ''
    });

  }
}
