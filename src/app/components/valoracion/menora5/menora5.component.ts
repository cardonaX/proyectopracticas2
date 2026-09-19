import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PgFormsModule } from '@pagalo/ui/forms';
import { PgButtonModule } from '@pagalo/ui/button';

export type TextareaVariant = 'simple' | 'avatar-actions' | 'underline-actions' | 'title-actions' | 'preview';
const guardardatos = () => {
  const datos = localStorage.getItem('comentariomenora5')
  return datos ?? '';
}
@Component({
  selector: 'menor-5',
  imports: [PgFormsModule, FormsModule, PgButtonModule],
  templateUrl: './menora5.component.html',
  styleUrl: './menora5.component.css'
})
export class Menora5Component {

  textarea = signal(guardardatos())

  guardar = effect(() => {
    localStorage.setItem('comentariomenora5', this.textarea())
  })


  @Output() atrasClick = new EventEmitter<void>();
  @Output() enviarClick = new EventEmitter<void>();

  atras() {
    this.atrasClick.emit();
  }
  enviar() {
    this.enviarClick.emit();
  }


}
