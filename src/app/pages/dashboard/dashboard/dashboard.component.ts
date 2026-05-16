import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/shared/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import { DashboardService } from '../dashboard.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { ResenasService } from 'src/app/core/services/resenas.service';

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
    evento: { id: 0, codigo: '' },
    jornada: { id: 0 },
    usuario: { id: 0 },
    leida: false,
    cargando: false
  }

  // Variables para reseñas
  mostrarModalResena: boolean = false;
  eventoParaResena: Evento | null = null;
  resenaNueva = {
    descripcion: '',
    titulo: '',
    calificacion: 0,
    usuario: { id: 0 },
    evento: { id: 0 },
    asistencia: { id: 0 }
  };
  fotoResena: File | null = null;
  previewFoto: string | null = null;

  constructor(
    private router: Router,
    private eventosService: EventosService,
    private inscripcionesService: InscripcionesService,
    private resenasService: ResenasService
  ) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || 'Usuario';
    this.restablecerVistas();
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

  restablecerVistas() {
    this.getEventosActuales();
    this.getProximosEventos();
    this.getEventosInteres();
    this.getEventosComunidad();
    this.getTipoEventos();
    this.getEventosAsistidos();
  }
  getEventosAsistidos() {
    this.listaEventosAsistidos = [];
    this.eventosService.getEventosAsistidos().subscribe((res: any) => {
      if (res.codigo == 200) {
        this.listaEventosAsistidos = res.listaRespuesta;
        this.listaEventosAsistidosOriginal = res.listaRespuesta;
      } else {
        this.listaEventosAsistidos = [];
        this.listaEventosAsistidosOriginal = [];
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
    this.listaEventosAsistidos = this.listaEventosAsistidosOriginal;
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
    this.listaEventosAsistidos = this.listaEventosAsistidosOriginal.filter((evento: Evento) => {
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
    console.log("Fecha de apertura: ", evento.fechaDeApertura);
    if (!evento.fechaDeApertura) return false;
    const ahora = new Date();
    console.log("Es evento proximo ", new Date(evento.fechaDeApertura) > ahora);
    return new Date(evento.fechaDeApertura) > ahora;
  }

  esEventoCerrado(evento: Evento): boolean {
    if (!evento.fechaDeFinalizacion) return false;
    const ahora = new Date();
    return new Date(evento.fechaDeFinalizacion) < ahora;
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
        this.restablecerVistas();
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
    const codigo = url.href.split('c=')[1].split('&')[0];
    this.asistencia.leida = true;
    this.asistencia.cargando = true;
    this.usarCamara = false;
    this.asistencia.evento.id = Number(eventoId);
    this.asistencia.evento.codigo = codigo;
    this.asistencia.jornada.id = Number(jornadaId);
    this.asistencia.usuario.id = Number(JSON.parse(this.usuario!).id);
    await this.registrarAsistencia();
  }

  enviarCodigoManual() {
    if (!this.codigoManual || this.codigoManual.trim() === '') {
      console.warn('Código vacío');
      return;
    }
    this.asistencia.evento.id = Number(this.eventoDetalle!.id);
    this.asistencia.evento.codigo = this.codigoManual;
    this.asistencia.jornada.id = Number(this.jornadaSeleccionada!.id);
    this.asistencia.usuario.id = Number(JSON.parse(this.usuario!).id);

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
    this.opcionesIngreso = false;
    this.volver();
    if (respuesta.codigo == 200) {
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

  anularInscripcion() {
    Swal.fire({
      title: 'Funcionalidad en desarrollo',
      text: 'Aún no se encuentra activa la anulación de la inscripción',
      icon: 'info',
      confirmButtonColor: '#2f80c3'
    })
  }

  // Métodos para reseñas
  abrirModalResena(evento: Evento, event: MouseEvent) {
    event.stopPropagation();
    this.eventoParaResena = evento;
    const idAsistencia = evento.idAsistencia || 0;
    this.resenaNueva = {
      titulo: '',
      descripcion: '',
      calificacion: 0,
      usuario: { id: JSON.parse(this.usuario!).id },
      evento: { id: evento.id },
      asistencia: { id: idAsistencia }
    };
    this.fotoResena = null;
    this.previewFoto = null;
    this.mostrarModalResena = true;
  }

  cerrarModalResena() {
    this.mostrarModalResena = false;
    this.eventoParaResena = null;
  }

  seleccionarCalificacion(rating: number) {
    this.resenaNueva.calificacion = rating;
  }

  onFotoSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoResena = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewFoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async guardarResena() {
    if (this.resenaNueva.calificacion === 0) {
      Swal.fire('Atención', 'Por favor selecciona una calificación', 'warning');
      return;
    }
    if (!this.resenaNueva.descripcion.trim()) {
      Swal.fire('Atención', 'Por favor escribe un comentario', 'warning');
      return;
    }

    try {
      Swal.showLoading();
      const respResena: any = await firstValueFrom(this.resenasService.crearResena(this.resenaNueva));

      if (respResena.codigo === 200 || respResena.codigo === 201) {
        const idResena = respResena.data.id;

        if (this.fotoResena) {
          await firstValueFrom(this.resenasService.subirMultimediaResena(idResena, this.fotoResena));
        }

        Swal.fire({
          title: '¡Reseña guardada!',
          text: 'Gracias por compartir tu opinión',
          icon: 'success',
          confirmButtonColor: '#2f80c3'
        });
        this.cerrarModalResena();
      } else {
        Swal.fire('Error', respResena.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error al guardar reseña', error);
      Swal.fire('Error', 'No se pudo guardar la reseña', 'error');
    }
  }

  irAResenas(idEvento: number) {
    this.router.navigate(['/eventos/resenas', idEvento]);
  }
}