import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LISTAS_SENADO, ListaSenado } from '../listas-senado.constants';

@Component({
  selector: 'app-senado',
  imports: [CommonModule],
  templateUrl: './senado.component.html',
  styleUrl: './senado.component.scss'
})
export class SenadoComponent implements OnInit, OnDestroy {
  listas: ListaSenado[] = LISTAS_SENADO;
  mostrarModal = false;
  mensajeModal = '';
  candidatoSeleccionado: { numero: number; elegido: boolean } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSeleccionarCandidato(candidato: { numero: number; elegido: boolean }, lista: ListaSenado) {
    this.candidatoSeleccionado = candidato;
    
    if (candidato.elegido) {
      this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
    } else {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
    }
    
    this.mostrarModal = true;
  }

  onClickListaNoPreferente(lista: ListaSenado) {
    if (!lista.preferente) {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
      this.mostrarModal = true;
    }
  }

  cerrarModalYVolver() {
    this.mostrarModal = false;
    this.limpiarDatos();
    this.router.navigate(['/']);
  }

  limpiarDatos() {
    this.candidatoSeleccionado = null;
    this.mensajeModal = '';
  }

  volver() {
    this.limpiarDatos();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.limpiarDatos();
  }
}
