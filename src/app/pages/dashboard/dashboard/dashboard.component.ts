import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/shared/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import { DashboardService } from '../dashboard.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';

declare const $: any;
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

  listaJornadasInscritas: any[] = [];
  eventoDetalle: Evento | null = null;
  opcionesIngreso: boolean = false;
  usarCamara: boolean = false;
  digitarCodigo: boolean = false;

  modoQR: boolean = false;
  modoCodigo: boolean = false;
  codigoManual: string = '';
  listaComunidadesEvento: any[] = [{
    nombre: "Comunidad 1"
  }, {
    nombre: "Comunidad 2"
  }, {
    nombre: "Comunidad 3"
  }];
  jornadaSeleccionada: any = null;

  usuario: string = '';

  asistencia = {
    evento: { id: 0 },
    jornada: { id: 0 },
    usuario: { id: 0 },
    leida: false,
    cargando: false
  }
  constructor(private eventosService: EventosService, private inscripcionesService: InscripcionesService) { }

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
      if (res.codigo == 200) {
        this.listaTipoEventos = res.listaRespuesta;
      } else {
        this.listaTipoEventos = [];
      }
    });
  }

  getEventosActuales() {
    this.listaEventosActuales = [];
    this.eventosService.getEventosActuales().subscribe((res: any) => {
      if (res.codigo == 200) {
        this.listaEventosActuales = res.listaRespuesta;
        this.listaEventosActualesOriginal = res.listaRespuesta;
      } else {
        this.listaEventosActuales = [];
        this.listaEventosActualesOriginal = [];
      }
    });
  }

  getProximosEventos() {
    this.listaEventosProximos = [];
    this.eventosService.getProximosEventos().subscribe((res: any) => {
      if (res.codigo == 200) {
        this.listaEventosProximos = res.listaRespuesta;
        this.listaEventosProximosOriginal = res.listaRespuesta;
      } else {
        this.listaEventosProximos = [];
        this.listaEventosProximosOriginal = [];
      }
    });
  }

  getEventosInteres() {
    this.listaEventosInteres = [];
    this.eventosService.getEventosInteres().subscribe((res: any) => {
      if (res.codigo == 200) {
        this.listaEventosInteres = res.listaRespuesta;
        this.listaEventosInteresOriginal = res.listaRespuesta;
      } else {
        this.listaEventosInteres = [];
        this.listaEventosInteresOriginal = [];
      }
    });
  }

  getEventosComunidad() {
    this.listaEventosComunidad = [];
    this.eventosService.getEventosComunidad().subscribe((res: any) => {
      if (res.codigo == 200) {
        this.listaEventosComunidad = res.listaRespuesta;
        this.listaEventosComunidadOriginal = res.listaRespuesta;
      } else {
        this.listaEventosComunidad = [];
        this.listaEventosComunidadOriginal = [];
      }
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

  async verDetalle(evento: Evento): Promise<void> {
    this.eventoDetalle = evento;
    this.jornadaSeleccionada = null;
    try {
      const eventoBuscar = { id: evento.id, nombre: evento.nombre };
      const jornadas = await firstValueFrom(this.eventosService.getJornadasByEvento(eventoBuscar));
      this.eventoDetalle.listaJornadas = jornadas.listaRespuesta;

      const inscripcion = {
        usuario: {
          id: JSON.parse(this.usuario!).id,
        },
        evento: {
          id: this.eventoDetalle!.id
        }
      }
      //consultar las inscripciones que tiene el usuario al evento
      const inscripcionResult: any = await firstValueFrom(this.inscripcionesService.getPreinscripcion(inscripcion));
      if (inscripcionResult.codigo == 200) {
        const payload = {
          id: inscripcionResult.data?.id
        }
        const inscripcionjornadas: any = await firstValueFrom(this.inscripcionesService.getPreinscripcionJornadas(payload));
        if (inscripcionjornadas.codigo == 200) {
          for (const i of inscripcionjornadas.listaRespuesta) {
            this.listaJornadasInscritas.push({
              id: i.jornada.id,

            })
          }
        } else {
          this.listaJornadasInscritas = [];
        }

      } else {
        this.listaJornadasInscritas = [];
      }
    } catch (e) {
      console.error("Error al cargar jornadas", e);
    }
  }

  volver(): void {
    this.eventoDetalle = null;
    this.jornadaSeleccionada = null;
    this.restablecerListas();
  }

  seleccionarJornada(jornada: any) {
    this.jornadaSeleccionada = jornada;
    console.log("Jornada seleccionada ", this.jornadaSeleccionada);
    console.log("listaJornadasInscritas ", this.listaJornadasInscritas);
    //consultar si la jornada seleccionada del evento seleccionado ya esta realizada por el usuario 

    if (this.listaJornadasInscritas.length > 0) {
      if (this.listaJornadasInscritas.some((jornada: any) => jornada.id == this.jornadaSeleccionada.id)) {
        this.jornadaSeleccionada.esInscrito = true;
      } else {
        this.jornadaSeleccionada.esInscrito = false;
      }
    } else {
      this.jornadaSeleccionada.esInscrito = false;
    }

  }

  esEventoActivo(evento: Evento): boolean {
    if (!evento.fechaDeApertura || !evento.fechaDeFinalizacion) return false;
    const ahora = new Date();
    return new Date(evento.fechaDeApertura) <= ahora && new Date(evento.fechaDeFinalizacion) >= ahora;
  }

  esEventoProximo(evento: Evento): boolean {
    if (!evento.fechaDeApertura) return false;
    const ahora = new Date();
    return new Date(evento.fechaDeApertura) > ahora;
  }

  async inscribirse(): Promise<void> {
    if (!this.jornadaSeleccionada) return;
    const preinscripcion = {
      usuario: {
        id: JSON.parse(this.usuario!).id,
      },
      evento: {
        id: this.eventoDetalle!.id
      }
    }
    const respuesta = await firstValueFrom(this.inscripcionesService.createPreinscripcion(preinscripcion));
    if (respuesta.codigo == 200) {
      const inscripcionJornada = {
        preinscripcion: {
          id: respuesta.data.id
        },
        jornada: {
          id: this.jornadaSeleccionada.id
        }
      }
      const respuestaJornada = await firstValueFrom(this.inscripcionesService.createPreinscripcionJornada(inscripcionJornada));
      if (respuestaJornada.codigo == 200) {
        Swal.fire({
          title: '¡Inscripción exitosa!',
          text: 'Te has inscrito a la jornada correctamente.',
          icon: 'success',
          confirmButtonColor: '#2f80c3'
        });
        this.volver();
      }

    }
  }

  async onScanSuccess(result: string) {
    const url = new URL(result);
    console.log("URL: ", url);
    const eventoId = url.href.split('e=')[1].split('&')[0];
    const jornadaId = url.href.split('j=')[1].split('&')[0];
    const ts = url.href.split('ts=')[1].split('&')[0];
    const token = url.href.split('tk=')[1].split('&')[0];
    this.asistencia.leida = true;
    this.asistencia.cargando = true;
    this.usarCamara = false;
    this.asistencia.evento.id = Number(eventoId);
    this.asistencia.jornada.id = Number(jornadaId);
    this.asistencia.usuario.id = Number(JSON.parse(this.usuario!).id);
    await this.registrarAsistencia();
  }

  enviarCodigoManual() {
    if (!this.codigoManual || this.codigoManual.trim() === '') {
      console.warn('Código vacío');
      return;
    }

    this.registrarAsistencia();
  }

  abrirOpcionesIngreso() {
    this.opcionesIngreso = true;
    this.modoQR = false;
    this.modoCodigo = false;
    this.codigoManual = '';
  }

  async registrarAsistencia(): Promise<void> {
    const respuesta = await firstValueFrom(this.inscripcionesService.createAsistencia(this.asistencia));
    this.asistencia.cargando = false;
    if (respuesta.codigo == 200) {
      this.opcionesIngreso = false;
      Swal.fire({
        title: '¡Asistencia registrada!',
        text: 'Tu asistencia ha sido confirmada.',
        icon: 'success',
        confirmButtonColor: '#2f80c3'
      });
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo registrar tu asistencia.',
        footer: respuesta.mensaje,
        icon: 'error',
        confirmButtonColor: '#2f80c3'
      });
    }

  }
}