import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import { MyEvento } from 'src/app/shared/models/my-evento.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Mis Eventos', link: '/eventos/mis-eventos' },
    { label: 'Crear Evento' }
  ];

  listaComunidad: any = [];
  listaComunidadesSeleccionadas: any[] = [];
  listaTipoEventos: any[] = [];
  semaforo: string = "";
  form!: FormGroup;
  imagenPreview: any;
  nombreImagen: string = '';
  nuevoEvento: any = {
    nombre: '',
    descripcion: '',
    fechaDeFinalizacion: '',
    fechaDeApertura: '',
    tipoDeEvento: { id: '' },
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



  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getComunidades();
    this.getTiposEventos();
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
    this.nuevoEvento.horarios.push({ inicio: '', fin: '' });
  }

  eliminarHorario(index: number): void {
    if (this.nuevoEvento.horarios.length > 1) {
      this.nuevoEvento.horarios.splice(index, 1);
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
      this.nuevoEvento.nombreImagen = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.nombreImagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  }

  async crearEvento(): Promise<void> {

    try {
      this.nuevoEvento.idUsuarioCreador.id = this.authService.obtenerUsuario().id;
      this.nuevoEvento.tipoDeEvento.id = Number(this.nuevoEvento.tipoDeEvento.id);
      this.nuevoEvento.fechaDeFinalizacion = new Date(this.nuevoEvento.fechaDeFinalizacion);
      this.nuevoEvento.fechaDeApertura = new Date(this.nuevoEvento.fechaDeApertura);

      const eventoCreado: any = await firstValueFrom(this.eventosService.crearEvento(this.nuevoEvento));
      if (eventoCreado.codigo != 201) {
        Swal.fire({
          title: 'Error al crear el evento',
          text: eventoCreado.mensaje,
          icon: 'error',
          confirmButtonColor: '#1f5fa8'
        });
        return;
      }

      this.nuevoEvento.id = eventoCreado.data.id;

      if (this.listaComunidadesSeleccionadas.length > 0) {
        const eventoComunidadCreado: any = await firstValueFrom(this.eventosService.crearEventoComunidad(this.listaComunidadesSeleccionadas, eventoCreado.data.id));
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
          text: 'El evento debe estar dirigido al menos a una comunidad',
          icon: 'warning',
          confirmButtonColor: '#1f5fa8'
        });
        return;
      }

      if (this.nuevoEvento.horarios.length > 0) {
        this.nuevoEvento.horarios.forEach((horario: any) => {
          horario.evento.id = this.nuevoEvento.id;
        });
        if (this.nuevoEvento.horarios.some((horario: any) => horario.horaDeInicio == '' || horario.horaDeFinalizacion == '')) {
          Swal.fire({
            title: 'Atención',
            text: 'Todas las jornadas deben tener una hora de inicio y una hora de finalización',
            icon: 'warning',
            confirmButtonColor: '#1f5fa8'
          });
          return;
        }
        const listaJornadasCreadas: any = await firstValueFrom(this.eventosService.crearJornadasEvento(this.nuevoEvento.horarios));
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

      if (this.imagenPreview != null) {
        const cargarFotoEvento: any = await firstValueFrom(this.eventosService.upLoadPortadaEvento(this.nuevoEvento.id, this.imagenPreview));
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
        title: '¡Evento creado!',
        text: `${this.nuevoEvento.nombre} fue creado exitosamente`,
        icon: 'success',
        confirmButtonColor: '#1f5fa8'
      }).then(() => {
        this.router.navigate(['/eventos/mis-eventos']);
      });

    } catch (error: any) {
      Swal.fire({
        title: 'Error al crear el evento',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#1f5fa8'
      });
      return;
    }
  }
  async onSubmit(): Promise<void> {

    // if (this.nuevoEvento.id != null) {
    //   Swal.fire({
    //     title: 'Atención',
    //     text: 'El evento ya fué creado',
    //     icon: 'warning',
    //     confirmButtonColor: '#1f5fa8'
    //   });
    //   return;
    // }

    await this.crearEvento()

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