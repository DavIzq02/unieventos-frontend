import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/shared/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../home/home/home.component.css']
})
export class DashboardComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [{ label: 'Inicio' }];

  listaTipoEventos: any[] = [];

  textoBusqueda = '';
  categoriaSeleccionada = 'todos';

  listaEventosActuales: Evento[] = [];
  listaEventosProximos: Evento[] = [];
  listaEventosInteres: Evento[] = [];
  listaEventosAsistidos: Evento[] = [];
  listaEventosComunidad: Evento[] = [];

  listaEventosActualesOriginal: Evento[] = [];
  listaEventosProximosOriginal: Evento[] = [];
  listaEventosInteresOriginal: Evento[] = [];
  listaEventosAsistidosOriginal: Evento[] = [];
  listaEventosComunidadOriginal: Evento[] = [];

  eventoDetalle: Evento | null = null;

  usuario: string = '';

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || 'Usuario';
    this.getEventosActuales();
    this.getProximosEventos();
    this.getEventosInteres();
    this.getEventosComunidad();
    this.getTipoEventos();
    //this.getEventosAsistidos();
  }

  getTipoEventos() {
    this.listaTipoEventos = [];
    this.eventosService.getTipoEventos().subscribe((res: any) => {
      this.listaTipoEventos = res.listaRespuesta;
    });
  }

  getEventosActuales() {
    this.listaEventosActuales = [];
    this.eventosService.getEventosActuales().subscribe((res: any) => {
      this.listaEventosActuales = res.listaRespuesta;
      this.listaEventosActualesOriginal = res.listaRespuesta;
    });
  }

  getProximosEventos() {
    this.listaEventosProximos = [];
    this.eventosService.getProximosEventos().subscribe((res: any) => {
      this.listaEventosProximos = res.listaRespuesta;
      this.listaEventosProximosOriginal = res.listaRespuesta;
    });
  }

  getEventosInteres() {
    this.listaEventosInteres = [];
    this.eventosService.getEventosInteres().subscribe((res: any) => {
      this.listaEventosInteres = res.listaRespuesta;
      this.listaEventosInteresOriginal = res.listaRespuesta;
    });
  }

  getEventosComunidad() {
    this.listaEventosComunidad = [];
    this.eventosService.getEventosComunidad().subscribe((res: any) => {
      this.listaEventosComunidad = res.listaRespuesta;
      this.listaEventosComunidadOriginal = res.listaRespuesta;
    });
  }


  restablecerListas() {
    this.listaEventosActuales = this.listaEventosActualesOriginal;
    this.listaEventosProximos = this.listaEventosProximosOriginal;
    this.listaEventosInteres = this.listaEventosInteresOriginal;
    this.listaEventosComunidad = this.listaEventosComunidadOriginal;
  }
  filtrarBusqueda() {
    if (this.textoBusqueda == "") {
      this.restablecerListas()
      return;
    }

    this.listaEventosActuales = this.listaEventosActualesOriginal.filter((evento: Evento) => {
      return evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
    });
    this.listaEventosProximos = this.listaEventosProximosOriginal.filter((evento: Evento) => {
      return evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
    });
    this.listaEventosInteres = this.listaEventosInteresOriginal.filter((evento: Evento) => {
      return evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
    });
    this.listaEventosComunidad = this.listaEventosComunidadOriginal.filter((evento: Evento) => {
      return evento.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
    });
  }

  filtrar() {
    if (this.categoriaSeleccionada == "todos") {
      this.restablecerListas();
      return;
    }
    this.listaEventosActuales = this.listaEventosActualesOriginal.filter((evento: Evento) => {
      return evento.nombreTipoEvento == this.categoriaSeleccionada;
    });
    this.listaEventosProximos = this.listaEventosProximosOriginal.filter((evento: Evento) => {
      return evento.nombreTipoEvento == this.categoriaSeleccionada;
    });
    this.listaEventosInteres = this.listaEventosInteresOriginal.filter((evento: Evento) => {
      return evento.nombreTipoEvento == this.categoriaSeleccionada;
    });
    this.listaEventosComunidad = this.listaEventosComunidadOriginal.filter((evento: Evento) => {
      return evento.nombreTipoEvento == this.categoriaSeleccionada;
    });
  }

  verDetalle(evento: Evento): void {
    this.eventoDetalle = evento;
  }

  volver(): void {
    this.eventoDetalle = null;
  }
}