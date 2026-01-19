import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LISTAS_CAMARA, ListaCamara } from '../listas-camara.constants';

@Component({
  selector: 'app-camara-representantes',
  imports: [CommonModule],
  templateUrl: './camara-representantes.component.html',
  styleUrl: './camara-representantes.component.scss'
})
export class CamaraRepresentantesComponent implements OnInit, OnDestroy {
  listas: ListaCamara[] = LISTAS_CAMARA;
  mostrarModal = false;
  mensajeModal = '';
  candidatoSeleccionado: { numero: number; elegido: boolean } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSeleccionarCandidato(candidato: { numero: number; elegido: boolean }, lista: ListaCamara) {
    this.candidatoSeleccionado = candidato;
    
    if (candidato.elegido) {
      this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
    } else {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
    }
    
    this.mostrarModal = true;
  }

  onClickListaNoPreferente(lista: ListaCamara) {
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
