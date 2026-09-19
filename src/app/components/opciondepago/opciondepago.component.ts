import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { opciones } from './IDs/ids';

import { PgSelectModule, PgSelectOptionComponent } from '@pagalo/ui/select';
@Component({
  selector: 'opcionde-pago',
  imports: [FormsModule, PgSelectModule, PgSelectOptionComponent, ReactiveFormsModule],
  templateUrl: './opciondepago.component.html',
  styleUrl: './opciondepago.component.css'
})
export class OpciondepagoComponent {
  public opciones = opciones;
  seleccionar = '';
  private router = inject(Router);

  enviar() {
    const opcionElegida = this.opciones.find(op => op.value === this.seleccionar);

    if (opcionElegida) {
      const numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
      this.router.navigate([opcionElegida.value, numeroAleatorio]);
    }
  }
}