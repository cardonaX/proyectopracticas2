import { Component, EventEmitter, Output } from '@angular/core';
import { PgSelectModule } from '@pagalo/ui/select';
import { PgModalModule } from '@pagalo/ui/modal';
import { PgFormsModule } from '@pagalo/ui/forms';
import { PgButtonModule } from '@pagalo/ui/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'mayor-8',
  imports: [ReactiveFormsModule, PgFormsModule, PgSelectModule,
    PgModalModule,
    PgFormsModule,
    PgButtonModule,
    FormsModule
  ],
  templateUrl: './mayora8.component.html',
  styleUrl: './mayora8.component.css'
})
export class Mayora8Component {
  @Output() atrasClick = new EventEmitter<void>();
  @Output() enviarClick = new EventEmitter<number>();

  seleccionado: number | null = null;

  atras() {
    this.atrasClick.emit();
  }


  onSelec(valor: number) {
    this.seleccionado = valor;
  }

  enviar() {
    if (this.seleccionado !== null) {
      this.enviarClick.emit(this.seleccionado);
    }
  }

}