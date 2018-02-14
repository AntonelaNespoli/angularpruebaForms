import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: Object = {
    nombrecompletp: {
      nombre: null,
      apellido: null
    },
    correo: null,
    pasatiempos: null,
  };

  constructor() {
    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl(null,
                                  [Validators.required,
                                  Validators.minLength(5) ]),
        'apellido': new FormControl(null,
                                    [Validators.required,
                                    this.noLopez ])
                                  }),
      'correo': new FormControl(null,
                                [Validators.required,
                                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([new FormControl(null, Validators.required)]),
      'username': new FormControl(null, Validators.required, this.existeUsuario),
      'password1': new FormControl(null, Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIguales.bind(this.forma)
      // Cuando la funcion se ejecuta el "this" ya no es valido por esto tenemos que hacer un bind para pasarle el form completo
    ]);
    // this.forma.setValue(this.usuario);
  }
  guardarCambios() {
    console.log(this.forma);
  }

  nuevoPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl(null, Validators.required));
  }

  noLopez( control: FormControl): { [s: string]: boolean } {
    if (control.value === 'lopez') {
      return{
        nolopez: true
      };
    }
    return null;
  }

  noIguales( control: FormControl): { [s: string]: boolean } {
    // al haberle pasado la data "this" representa a "this.forma" por eso solo usamos this.
    if (control.value !== this.controls['password1'].value) {
      return{
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any>{
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          if (control.value === 'strider' ) {
            resolve({ existe: true });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }
}
