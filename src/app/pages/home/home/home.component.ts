import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../../../shared/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [{ label: 'Inicio' }];

  categorias = ['todos', 'Académico', 'Cultural', 'Lectura', 'Festival',
    'Deportivo', 'Social', 'Tecnologico', 'Bienestar'];

  textoBusqueda = '';
  categoriaSeleccionada = 'todos';

  eventosActuales: Evento[] = [];
  proximosEventos: Evento[] = [];

  eventoDetalle: Evento | null = null;

  constructor(
    private eventosService: EventosService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  irLogin(): void {
    this.router.navigate(['/login']);
  }
}