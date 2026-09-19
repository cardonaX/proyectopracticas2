import { Component, effect, inject, signal, Output, EventEmitter } from '@angular/core';
import { PgButtonModule } from '@pagalo/ui/button';
const obtenerCalificacionGuardada = (): number => {
  const dato = localStorage.getItem('calificacion');
  return dato ? Number(dato) : 1;
};

@Component({
  selector: 'app-valoracion',
  imports: [PgButtonModule],
  templateUrl: './valoracion.component.html',
  styleUrl: './valoracion.component.css'
})
export class ValoracionComponent {
  @Output() atrasClick = new EventEmitter<void>();
  @Output() enviarValoracion = new EventEmitter<number>();


  calificacion = signal(obtenerCalificacionGuardada());
  guardar = effect(() => {
    localStorage.setItem('calificacion', String(this.calificacion()));
  });

  onCmbio(valor: number) {
    this.calificacion.set(valor);
  }

  enviar() {
    this.enviarValoracion.emit(this.calificacion());
  }

  atras() {
    this.atrasClick.emit();
  }
}