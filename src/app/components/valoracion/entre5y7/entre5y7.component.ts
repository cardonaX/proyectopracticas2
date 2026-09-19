import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PgButtonModule } from '@pagalo/ui/button';
import { PgFormsModule } from '@pagalo/ui/forms';
export type TextareaVariant = 'simple' | 'avatar-actions' | 'underline-actions' | 'title-actions' | 'preview';
const guardardatos = (): string => {
  const datos = localStorage.getItem('comentarioentre5y7')
  return datos ?? '';
}
@Component({
  selector: 'entre5-7',
  imports: [PgButtonModule, PgFormsModule, FormsModule],
  templateUrl: './entre5y7.component.html',
  styleUrl: './entre5y7.component.css'

})
export class Entre5y7Component {

  textaream5m7 = signal(guardardatos())

  guardar = effect(() => {
    localStorage.setItem('comentarioentre5y7', this.textaream5m7())
  })


  @Output() atrasClick = new EventEmitter<void>();
  @Output() enviarClick = new EventEmitter<string>();

  atras() {
    this.atrasClick.emit();
  }

  enviar() {
    this.enviarClick.emit();
  }

}
