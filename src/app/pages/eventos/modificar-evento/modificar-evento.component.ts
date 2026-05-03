import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styleUrls: ['./modificar-evento.component.css']
})
export class ModificarEventoComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Mis Eventos', link: '/eventos/mis-eventos' },
    { label: 'Modificar Evento' }
  ];

  listaComunidad: any = [];
  listaComunidadesSeleccionadas: any[] = [];
  listaTipoEventos: any[] = [];
  semaforo: string = "";
  imagenPreview: any;
  nombreImagen: string = '';

  eventoSeleccionado: any = {
    id: 0,
    nombre: '',
    descripcion: '',
    urlImagenPortada: '',
    fechaDeCreacion: '',
    fechaDeFinalizacion: '',
    fechaDeApertura: '',
    tipoDeEvento: { id: '' },
    activo: true,
    idUsuarioCreador: { id: '' },
    horarios: [{ horaDeInicio: '', horaDeFinalizacion: '', evento: { id: '' } }]
  };

  multiselectComunidades = {
    lazyLoading: true,
    text: 'Seleccionar',
    selectAllText: 'Seleccionar todos',
    unSelectAllText: 'Deseleccionar todo',
    noDataLabel: 'No se encontraron resultados',
    classes: 'multiselect-unieventos',
    labelKey: 'nombre',
    primaryKey: 'id',
    enableSearchFilter: true,
    badgeShowLimit: 1,
    searchBy: ['nombre'],
    searchPlaceholderText: 'Buscar',
  }

  idEvento: any = "";
  eventoOriginal: any = {
    id: 0,
    nombre: '',
    descripcion: '',
    urlImagenPortada: '',
    fechaDeCreacion: '',
    fechaDeFinalizacion: '',
    fechaDeApertura: '',
    activo: true,
    tipoDeEvento: { id: '' },
    idUsuarioCreador: { id: '' },
    horarios: [] = [{ horaDeInicio: '', horaDeFinalizacion: '', evento: { id: '' } }]
  };
  listaComunidadesOriginal: any[] = [];

  cambioImagen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.idEvento = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getEventoSeleccionado();
    this.getComunidades();
    this.getTiposEventos();
  }

  getEventoSeleccionado(): void {
    this.eventosService.getEventoByid(this.idEvento).subscribe(async (resp: any) => {
      if (resp.codigo == 200) {
        this.eventoSeleccionado = resp.data;
        this.eventoSeleccionado.fechaDeApertura = this.eventoSeleccionado.fechaDeApertura?.split('T')[0];
        this.eventoSeleccionado.fechaDeFinalizacion = this.eventoSeleccionado.fechaDeFinalizacion?.split('T')[0];
        this.nombreImagen = this.eventoSeleccionado.urlImagenPortada;
        this.imagenPreview = this.eventoSeleccionado.urlImagenPortada;
        await this.getJornadas();
        await this.getComunidadesSeleccionadas();
        if (!this.eventoSeleccionado.idUsuarioCreador) {
          this.eventoSeleccionado.idUsuarioCreador = {};
        }
        this.eventoSeleccionado.idUsuarioCreador.id = this.authService.obtenerUsuario().id;
        this.listaComunidadesOriginal = JSON.parse(JSON.stringify(this.listaComunidadesSeleccionadas));
        this.eventoOriginal = JSON.parse(JSON.stringify(this.eventoSeleccionado));
      }
    });
  }

  async getJornadas() {
    const evento = {
      id: this.idEvento
    }

    try {
      const listaJornadas: any = await firstValueFrom(this.eventosService.getJornadasByEvento(evento));
      if (listaJornadas.codigo == 200) {
        this.eventoSeleccionado.horarios = listaJornadas.listaRespuesta;
        for (const jornada of this.eventoSeleccionado.horarios) {
          if (!jornada.evento) {
            jornada.evento = {}
          }
          jornada.evento.id = Number(this.idEvento);
        }
      }

    } catch (error) {
      this.getJornadas();
    }

  }

  async getComunidadesSeleccionadas() {
    try {
      const responseComunidades: any = await firstValueFrom(this.eventosService.getComunidadesSeleccionadasByEvento(this.idEvento));
      if (responseComunidades.codigo == 200) {
        this.listaComunidadesSeleccionadas = responseComunidades.listaRespuesta;
      }

    } catch (error) {
      this.getJornadas();
    }
  }

  getComunidades(): void {
    this.eventosService.getComunidades().subscribe((resp: any) => {
      if (resp.codigo == 200) {
        this.listaComunidad = resp.listaRespuesta;
      }
    });
  }

  getTiposEventos(): void {
    this.eventosService.getTipoEventos().subscribe((resp: any) => {
      if (resp.codigo == 200) {
        this.listaTipoEventos = resp.listaRespuesta;
      }
    });
  }

  agregarHorario(): void {
    if (!this.eventoSeleccionado.horarios) {
      this.eventoSeleccionado.horarios = [];
    }

    this.eventoSeleccionado.horarios.push({
      horaDeInicio: '',
      horaDeFinalizacion: '',
      evento: { id: Number(this.idEvento) }
    });
  }

  eliminarHorario(index: number): void {
    if (this.eventoSeleccionado.horarios.length > 1) {
      this.eventoSeleccionado.horarios.splice(index, 1);
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'Debe haber al menos un horario',
        icon: 'warning',
        confirmButtonColor: '#1f5fa8'
      });
    }
  }

  onImagenChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.imagenPreview = file;
      // this.eventoSeleccionado.nombreImagen = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.nombreImagen = reader.result as string;
        this.cambioImagen = true;
      };
      reader.readAsDataURL(file);
    }

  }

  irAMisEventos() {
    this.router.navigate(['/eventos/mis-eventos']);
  }

  async modificarEvento(): Promise<void> {


    if (JSON.stringify(this.eventoSeleccionado) === JSON.stringify(this.eventoOriginal) && JSON.stringify(this.listaComunidadesSeleccionadas) === JSON.stringify(this.listaComunidadesOriginal) && !this.cambioImagen) {
      Swal.fire({
        title: 'Atención',
        text: 'No se han realizado cambios en el evento',
        icon: 'warning',
        confirmButtonColor: '#1f5fa8'
      });
      return;
    }
    Swal.fire({
      title: "Un momento",
      text: "Se esta modificando el evento",
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    try {
      this.eventoSeleccionado.tipoDeEvento.id = Number(this.eventoSeleccionado.tipoDeEvento.id);
      this.eventoSeleccionado.fechaDeFinalizacion = new Date(this.eventoSeleccionado.fechaDeFinalizacion);
      this.eventoSeleccionado.fechaDeApertura = new Date(this.eventoSeleccionado.fechaDeApertura);

      const eventoCreado: any = await firstValueFrom(this.eventosService.updateEvento(this.eventoSeleccionado));
      if (eventoCreado.codigo != 201) {
        Swal.fire({
          title: 'Error al actualizar el evento',
          text: eventoCreado.mensaje,
          icon: 'error',
          confirmButtonColor: '#1f5fa8'
        });
        return;
      }

      if (this.listaComunidadesSeleccionadas.length > 0) {
        const eventoComunidadCreado: any = await firstValueFrom(this.eventosService.updateEventoComunidad(this.listaComunidadesSeleccionadas, this.eventoSeleccionado.id));
        if (eventoComunidadCreado.codigo != 201) {
          Swal.fire({
            title: 'Error al añadir el evento a las comunidades',
            text: eventoComunidadCreado.mensaje,
            icon: 'error',
            confirmButtonColor: '#1f5fa8'
          });
          return;
        }
      } else {
        Swal.fire({
          title: 'Atención',
          text: 'Debe seleccionar al menos una comunidad',
          icon: 'warning',
          confirmButtonColor: '#1f5fa8'
        });
        return;
      }
      if (this.eventoSeleccionado.horarios.length > 0) {
        if (this.eventoSeleccionado.horarios != JSON.stringify(this.eventoOriginal.horarios)) {
          const listaJornadasCreadas: any = await firstValueFrom(this.eventosService.updateJornadasEvento(this.eventoSeleccionado.horarios));
          if (listaJornadasCreadas.codigo != 201) {
            Swal.fire({
              title: 'Error al crear las jornadas del evento',
              text: listaJornadasCreadas.mensaje,
              icon: 'error',
              confirmButtonColor: '#1f5fa8'
            });
            return;
          }
        }
      }

      if (this.cambioImagen) {
        const cargarFotoEvento: any = await firstValueFrom(this.eventosService.updatePortadaEvento(this.eventoSeleccionado.id, this.imagenPreview));
        if (cargarFotoEvento.codigo != 200) {
          Swal.fire({
            title: 'Error al cargar la foto del evento',
            text: cargarFotoEvento.mensaje,
            icon: 'error',
            confirmButtonColor: '#1f5fa8'
          });
          return;
        }
      }


      Swal.fire({
        title: '¡Evento modificado!',
        text: `${this.eventoSeleccionado.nombre} fue modificado exitosamente`,
        icon: 'success',
        confirmButtonColor: '#1f5fa8'
      }).then(() => {
        this.router.navigate(['/eventos/mis-eventos']);
      });

    } catch (error: any) {
      console.log(error)
      Swal.fire({
        title: 'Error al modificar el evento',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#1f5fa8'
      });
      return;
    }
  }
  async onSubmit(): Promise<void> {

    // if (this.eventoSeleccionado.id != null) {
    //   Swal.fire({
    //     title: 'Atención',
    //     text: 'El evento ya fué creado',
    //     icon: 'warning',
    //     confirmButtonColor: '#1f5fa8'
    //   });
    //   return;
    // }

    await this.modificarEvento()

  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  onSelect(item: any) {
    console.log(item);
  }

  onDeSelect(item: any) {
    console.log(item);
  }
}