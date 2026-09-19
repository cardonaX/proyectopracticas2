import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OpciondepagoComponent } from './components/opciondepago/opciondepago.component';
import { idsvalidos } from './components/opciondepago/IDs/ids';
import { ValoracionComponent } from './components/valoracion/valoracion.component';
import { PaginaerrorComponent } from './components/paginaerror/paginaerror.component';
import { Menora5Component } from './components/valoracion/menora5/menora5.component';
import { Mayora8Component } from './components/valoracion/mayora8/mayora8.component';
import { Entre5y7Component } from './components/valoracion/entre5y7/entre5y7.component';
import { ContactarComponent } from './components/valoracion/mayora8/contactar/contactar.component';
import { PantallafinalComponent } from './components/pantallafinal/pantallafinal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type Estado = 'valoracion' | 'pago' | 'error';
type SubEstado = 'menor5' | 'entre5y7' | 'mayor8' | 'contactar' | 'final' | null;

@Component({
  selector: 'app-root',
  imports: [OpciondepagoComponent, ValoracionComponent, PaginaerrorComponent, Menora5Component, Mayora8Component, Entre5y7Component, ContactarComponent, PantallafinalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);

  id: string | null = null;
  numero: string | null = null;
  estado: Estado = 'error';
  subEstado: SubEstado = null;

  constructor() {
    this.actualizarEstado();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.actualizarEstado());
  }

  private actualizarEstado() {
    const segmentos = window.location.pathname.split('/').filter(Boolean);
    this.id = segmentos[0] ?? null;
    this.numero = segmentos[1] ?? null;

    if (!this.id || !this.numero) {
      this.estado = 'error';
    } else if (!idsvalidos.includes(this.id)) {
      this.estado = 'pago';
    } else {
      this.estado = 'valoracion';
    }

    console.log('id:', this.id, 'numero:', this.numero, 'estado:', this.estado);
  }

  onValoracionEnviada(valor: number) {
    if (valor < 5) {
      this.subEstado = 'menor5';
    } else if (valor <= 7) {
      this.subEstado = 'entre5y7';
    } else {
      this.subEstado = 'mayor8';
    }
  }
  irAContactar() {
    this.subEstado = 'contactar';
  }

  irAValoracion() {
    this.subEstado = null;
  }
  irAFinal() {
    this.subEstado = 'final';
  }
  onEnviarMayor8(valor: number) {
    if (valor === 1 || valor === 2) {
      this.subEstado = 'contactar';
    } else {
      this.subEstado = 'final';
    }
  }

  datosformulario(){
    
  }
}