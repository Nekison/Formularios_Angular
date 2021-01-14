import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Eider',
    apellido: 'Ortuño Valverde',
    correo: 'eider@gmail.com',
    pais: '',
    genero: 'M'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaise()
    .subscribe(paises => {
      this.paises = paises;

      this.paises.unshift({
        nombre: '[ Seleccione un pais ]',
        codigo: ''
      });

      console.log(this.paises);
    });
  }

  guardar(forma: NgForm){
    console.log(forma);
    console.log(forma.value);

    if( forma.invalid) {
      Object.values( forma.controls).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
