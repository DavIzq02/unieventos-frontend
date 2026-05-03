import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyEvento } from 'src/app/shared/models/my-evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/shared/models/evento.model';
import { firstValueFrom } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';

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

  listaEventos: Evento[] = [];
  listaEventosOriginal: Evento[] = [];

  get eventosActivos(): Evento[] {
    return this.listaEventos.filter(e => e.activo && !e.cerrado);
  }

  get eventosProximos(): Evento[] {
    return this.listaEventos.filter(e => !e.activo && !e.cerrado);
  }

  get eventosCerrados(): Evento[] {
    return this.listaEventos.filter(e => e.cerrado);
  }

  eventoSeleccionado: Evento | null = null;
  jornadaSeleccionada: any = null;
  modalAbierto = false;
  mostrarQR = false;
  categoriaSeleccionada: any;
  textoBusqueda: any;
  listaTipoEventos: any[] = [];

  constructor(
    private eventosService: EventosService,
    private inscripcionesService: InscripcionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarTipoEventos();
  }

  cargarTipoEventos() {
    this.listaTipoEventos = [];
    this.eventosService.getTipoEventos().subscribe((res: any) => {
      this.listaTipoEventos = res.listaRespuesta;
    });
  }

  cargarEventos(): void {
    this.eventosService.getEventosByUsuario().subscribe((res: any) => {
      this.listaEventos = res.listaRespuesta;
      for (const evento of this.listaEventos) {
        evento.activo = new Date(evento.fechaDeApertura) <= new Date() && new Date(evento.fechaDeFinalizacion) >= new Date();
        evento.cerrado = new Date(evento.fechaDeFinalizacion) < new Date();
      }
      this.listaEventosOriginal = this.listaEventos;
    });
  }

  restablecerListas() {
    this.listaEventos = this.listaEventosOriginal;
  }

  filtrar() {
    if (this.categoriaSeleccionada == "todos") {
      this.restablecerListas()
      return;
    }
    this.listaEventos = this.listaEventosOriginal.filter((evento: Evento) => {
      return evento.nombreTipoEvento.toLowerCase().includes(this.categoriaSeleccionada.toLowerCase());
    });
  }

  filtrarBusqueda() {
    if (this.textoBusqueda == "") {
      this.restablecerListas()
      return;
    }

    this.listaEventos = this.listaEventosOriginal.filter((evento: Evento) => {
      return evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
    });
  }

  async abrirModal(evento: Evento): Promise<void> {
    this.eventoSeleccionado = evento;
    this.jornadaSeleccionada = null;
    console.log("Id de evento", this.eventoSeleccionado.id)
    const eventoBuscar = {
      id: this.eventoSeleccionado.id,
      nombre: this.eventoSeleccionado.nombre,
    }
    const jornadas = await firstValueFrom(this.eventosService.getJornadasByEvento(eventoBuscar));
    this.eventoSeleccionado.listaJornadas = jornadas.listaRespuesta;
    this.modalAbierto = true;
    this.mostrarQR = false;
  }

  async verPreinscritos(jornada: any) {
    this.jornadaSeleccionada = jornada;
    console.log("Jornada: ", this.jornadaSeleccionada)
    const resp: any = await firstValueFrom(this.inscripcionesService.getUsuariosByJornada(this.jornadaSeleccionada));
    if (resp.codigo == 200) {
      this.jornadaSeleccionada.preinscritos = resp.listaRespuesta;
      console.log("Preinscritos: ", this.jornadaSeleccionada.preinscritos)
    } else if (resp.codigo == 404) {
      this.jornadaSeleccionada.preinscritos = [];
    } else {
      Swal.fire({
        title: 'Error al obtener los preinscritos',
        text: resp.mensaje,
        icon: 'error',
        confirmButtonColor: '#1f5fa8'
      });
    }
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.eventoSeleccionado = null;
    this.jornadaSeleccionada = null;
    this.mostrarQR = false;
  }

  toggleQR(): void {
    this.mostrarQR = !this.mostrarQR;
  }

  iniciarEvento(): void {
    if (!this.eventoSeleccionado) return;
    //this.eventosService.iniciarEvento(this.eventoSeleccionado.id);
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
    }).then(async result => {
      if (result.isConfirmed && this.eventoSeleccionado) {
        try {
          const respDelete: any = await firstValueFrom(this.eventosService.inactivarEvento(this.eventoSeleccionado.id));
          if (respDelete.codigo == 202) {
            this.cerrarModal();
            this.cargarEventos();
            Swal.fire({
              title: 'Eliminado',
              text: 'El evento fue eliminado correctamente',
              icon: 'success',
              confirmButtonColor: '#1f5fa8'
            });
          } else {
            Swal.fire({
              title: 'Error al eliminar el evento',
              text: respDelete.mensaje,
              icon: 'error',
              confirmButtonColor: '#1f5fa8'
            });
          }
        } catch (error: any) {
          Swal.fire({
            title: 'Error al eliminar el evento',
            text: error.message,
            icon: 'error',
            confirmButtonColor: '#1f5fa8'
          });
        }


      }
    });
  }

  modificarEvento(id: number): void {
    this.router.navigate(['/eventos/modificar-evento', id]);
  }

  irCrearEvento(): void {
    this.router.navigate(['/eventos/crear-evento']);
  }
}