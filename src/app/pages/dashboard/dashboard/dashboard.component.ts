import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/shared/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../home/home/home.component.css']
})
export class DashboardComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [{ label: 'Inicio' }];

  categorias = ['todos', 'Académico', 'Cultural', 'Deportivo',
    'Social', 'Tecnologico', 'Bienestar'];

  textoBusqueda = '';
  categoriaSeleccionada = 'todos';

  eventosActuales: Evento[] = [];
  proximosEventos: Evento[] = [];
  eventoDetalle: Evento | null = null;

  usuario: string = '';

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || 'Usuario';
    this.filtrar();
  }

  filtrar(): void {
    this.eventosActuales = this.eventosService.filtrar(
      this.eventosService.getEventosActuales(),
      this.textoBusqueda,
      this.categoriaSeleccionada
    );
    this.proximosEventos = this.eventosService.filtrar(
      this.eventosService.getProximosEventos(),
      this.textoBusqueda,
      this.categoriaSeleccionada
    );
  }

  verDetalle(evento: Evento): void {
    this.eventoDetalle = evento;
  }

  volver(): void {
    this.eventoDetalle = null;
  }
}