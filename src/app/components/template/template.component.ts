import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: null,
    acepta: false
  };

  paises = [{
    codigo: 'AR',
    nombre: 'Argentina'
  },
  {
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'ES',
    nombre: 'España'
  }];

  sexos: string[] = ['Hombre', 'Mujer'];
  constructor() { }

  ngOnInit() {
  }

  guardar( forma: NgForm) {
    console.log('ngForm', forma);
    console.log('valor', forma.value);
    console.log('usurio', this.usuario);
  }

}
