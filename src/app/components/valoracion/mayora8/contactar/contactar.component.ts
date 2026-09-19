import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PgSelectModule } from '@pagalo/ui/select';
import { PgModalModule } from '@pagalo/ui/modal';
import { PgFormsModule } from '@pagalo/ui/forms';
import { PgButtonModule } from '@pagalo/ui/button';
import { PgLinkDirective } from '@pagalo/ui/core';

interface DatosContacto {
  nombre: string;
  correo: string;
  edad: number;
  telefono: string;
  sexo: string;
}

const datosVacios: DatosContacto = {
  nombre: '',
  correo: '',
  edad: 0,
  telefono: '',
  sexo: '',
};

const obtenerDatosGuardados = (): DatosContacto => {
  const datos = localStorage.getItem('datosContacto');
  return datos ? JSON.parse(datos) : datosVacios;
};
@Component({
  selector: 'contactar',
  imports: [ReactiveFormsModule, PgSelectModule,
    PgModalModule,
    PgFormsModule,
    PgButtonModule,],
  templateUrl: './contactar.component.html',
  styleUrl: './contactar.component.css'
})
export class ContactarComponent {

  form = new FormGroup({
    nombre: new FormControl<string>('', { validators: Validators.required }),
    correo: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
    edad: new FormControl<number>(0),
    telefono: new FormControl<string>('', { validators: Validators.required }),
    sexo: new FormControl<string>(''),
  });


  datos = signal(obtenerDatosGuardados());


  guardar = effect(() => {
    localStorage.setItem('datosContacto', JSON.stringify(this.datos()));
  });

  // constructor() {




  //   this.form.valueChanges.subscribe((valores) => {
  //     this.datos.set(valores as DatosContacto);
  //   });
  // }
  // ngOnInit() {
  //   this.form.patchValue(this.datos());
  // }

  borrar() {
    this.datos.set(datosVacios);
    localStorage.removeItem('datosContacto');
    this.form.reset();
  }
  @Output() atrasClick = new EventEmitter<void>();
  @Output() enviarClick = new EventEmitter<void>();
  @Output() nointeresaClick = new EventEmitter<void>();

  atras() {
    this.atrasClick.emit();
  }
  enviar() {
    console.log('valores:', this.form.value, 'válido:', this.form.valid);
    if (this.form.valid) {
      this.enviarClick.emit();
    }
  }
  nointeresa() {
    this.nointeresaClick.emit()
  }
}
