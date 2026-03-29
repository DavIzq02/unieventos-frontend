import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyEvento } from 'src/app/shared/models/my-evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Mis Eventos' }
  ];

  misEventos: MyEvento[] = [];
  eventoSeleccionado: MyEvento | null = null;
  modalAbierto = false;
  mostrarQR = false;

  constructor(
    private eventosService: EventosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.misEventos = this.eventosService.getMisEventos();
  }

  abrirModal(evento: MyEvento): void {
    this.eventoSeleccionado = evento;
    this.modalAbierto = true;
    this.mostrarQR = false;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.eventoSeleccionado = null;
    this.mostrarQR = false;
  }

  toggleQR(): void {
    this.mostrarQR = !this.mostrarQR;
  }

  iniciarEvento(): void {
    if (!this.eventoSeleccionado) return;
    this.eventosService.iniciarEvento(this.eventoSeleccionado.id);
    this.cerrarModal();
    Swal.fire({
      title: '¡Evento iniciado!',
      text: `${this.eventoSeleccionado?.nombre} está ahora activo`,
      icon: 'success',
      confirmButtonColor: '#1f5fa8'
    });
    this.cargarEventos();
  }

  eliminarEvento(): void {
    if (!this.eventoSeleccionado) return;
    Swal.fire({
      title: '¿Eliminar evento?',
      text: `Se eliminará "${this.eventoSeleccionado.nombre}" permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#2f80c3',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed && this.eventoSeleccionado) {
        this.eventosService.eliminarEvento(this.eventoSeleccionado.id);
        this.cerrarModal();
        this.cargarEventos();
        Swal.fire({
          title: 'Eliminado',
          text: 'El evento fue eliminado correctamente',
          icon: 'success',
          confirmButtonColor: '#1f5fa8'
        });
      }
    });
  }

  modificarEvento(): void {
    Swal.fire({
      title: 'Próximamente',
      text: 'El módulo de modificación estará disponible pronto',
      icon: 'info',
      confirmButtonColor: '#1f5fa8'
    });
  }

  irCrearEvento(): void {
    this.router.navigate(['/eventos/crear-evento']);
  }
}