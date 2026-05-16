import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BreadcrumbItem } from 'src/app/shared/models/breadcrumb-item.model';
import { EventosService } from 'src/app/core/services/eventos.service';
import { ResenasService, Resena, ResenaMultimedia } from 'src/app/core/services/resenas.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Reseñas' }
  ];

  idEvento: number | null = null;
  evento: any = null;
  comunidades: any[] = [];
  resenas: Resena[] = [];
  calificacionPromedio: number = 0;
  cargando: boolean = true;
  error: string | null = null;

  // Filtros adicionales
  filtroTexto: string = '';
  filtroEventoId: number = 0; // 0 significa "Todos los eventos"

  // Para el selector de eventos en vista general
  get listaEventosUnicos(): { id: number, nombre: string }[] {
    const eventos: any = {};
    this.resenas.forEach(r => {
      if (r.idEvento && r.nombreEvento) {
        eventos[r.idEvento] = r.nombreEvento;
      }
    });
    return Object.keys(eventos).map(id => ({ id: +id, nombre: eventos[id] }));
  }

  // Lightbox
  imagenAmpliada: string | null = null;

  // Filtro de calificación
  filtroCalificacion: number | null = null;
  get resenasFiltradas(): Resena[] {
    let filtradas = this.resenas;

    // 1. Filtro por estrellas
    if (this.filtroCalificacion !== null) {
      filtradas = filtradas.filter(r => r.calificacion === this.filtroCalificacion);
    }

    // 2. Filtro por Evento (Vista general)
    if (!this.idEvento && this.filtroEventoId !== 0) {
      filtradas = filtradas.filter(r => r.idEvento === this.filtroEventoId);
    }

    // 3. Filtro por Texto (Buscador)
    if (this.filtroTexto.trim()) {
      const txt = this.filtroTexto.toLowerCase();
      filtradas = filtradas.filter(r =>
        (r.nombreEvento?.toLowerCase().includes(txt)) ||
        (r.descripcion?.toLowerCase().includes(txt)) ||
        (r.titulo?.toLowerCase().includes(txt)) ||
        (r.nombreUsuario?.toLowerCase().includes(txt))
      );
    }

    return filtradas;
  }

  // Distribución de calificaciones
  get distribucionCalificaciones(): { estrellas: number; cantidad: number; porcentaje: number }[] {
    return [5, 4, 3, 2, 1].map(n => {
      const cantidad = this.resenas.filter(r => r.calificacion === n).length;
      const porcentaje = this.resenas.length > 0 ? (cantidad / this.resenas.length) * 100 : 0;
      return { estrellas: n, cantidad, porcentaje };
    });
  }

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private resenasService: ResenasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idEvento = +id;
        this.breadcrumb = [
          { label: 'Inicio', link: '/dashboard' },
          { label: 'Mis Eventos', link: '/eventos/mis-eventos' },
          { label: 'Reseñas' }
        ];
        this.cargarDatos();
      } else {
        this.breadcrumb = [
          { label: 'Inicio', link: '/dashboard' },
          { label: 'Reseñas' }
        ];
        this.cargarTodasResenas();
      }
    });
  }

  async cargarDatos(): Promise<void> {
    this.cargando = true;
    this.error = null;
    try {
      if (this.idEvento) {
        // Cargar información del evento
        const eventoResp: any = await firstValueFrom(this.eventosService.getEventoByid(this.idEvento));
        this.evento = eventoResp?.data || eventoResp?.listaRespuesta?.[0] || null;

        // Cargar comunidades del evento
        try {
          const comunResp: any = await firstValueFrom(this.eventosService.getComunidadesSeleccionadasByEvento(this.idEvento));
          this.comunidades = comunResp?.listaRespuesta || [];
        } catch { this.comunidades = []; }

        // Cargar reseñas del evento
        await this.cargarResenasByEvento(this.idEvento);

        // Calcular promedio localmente si el backend no lo tiene
        this.calcularPromedioLocal();
      }
    } catch (err) {
      this.error = 'Error al cargar la información. Intente nuevamente.';
      console.error(err);
    } finally {
      this.cargando = false;
    }
  }

  async cargarResenasByEvento(idEvento: number): Promise<void> {
    try {
      const resp: any = await firstValueFrom(this.resenasService.getResenasByEvento(idEvento));
      const lista: Resena[] = resp?.listaRespuesta || [];
      this.resenas = lista;

      // Cargar multimedia para cada reseña
      for (const resena of this.resenas) {
        resena.listaMultimedia = resena?.multimedia || [];
      }
    } catch (err) {
      console.error('Error al cargar reseñas:', err);
      this.resenas = [];
    }
  }

  async cargarTodasResenas(): Promise<void> {
    this.cargando = true;
    this.error = null;
    try {
      const usuario = {
        id: this.authService.obtenerUsuario().id
      }
      const resp: any = await firstValueFrom(this.resenasService.getAllResenasByUsuario(usuario));
      const lista: Resena[] = resp?.listaRespuesta || [];
      this.resenas = lista;

      for (const resena of this.resenas) {
        try {
          const multResp: any = await firstValueFrom(this.resenasService.getMultimediaByResena(resena.id));
          resena.listaMultimedia = multResp?.listaRespuesta || [];
        } catch {
          resena.listaMultimedia = [];
        }
      }

      this.calcularPromedioLocal();
    } catch (err) {
      this.error = 'Error al cargar las reseñas.';
    } finally {
      this.cargando = false;
    }
  }

  calcularPromedioLocal(): void {
    if (this.resenas.length === 0) {
      this.calificacionPromedio = 0;
      return;
    }
    const suma = this.resenas.reduce((acc, r) => acc + (r.calificacion || 0), 0);
    this.calificacionPromedio = parseFloat((suma / this.resenas.length).toFixed(1));
  }

  getStars(count: number): number[] {
    return Array(Math.floor(count)).fill(0).map((_, i) => i + 1);
  }

  isFullStar(calificacion: number, index: number): boolean {
    return calificacion >= index;
  }

  isHalfStar(calificacion: number, index: number): boolean {
    return calificacion >= index - 0.5 && calificacion < index;
  }

  getFotoUsuario(resena: Resena): string {
    if (resena.urlFoto && resena.urlFoto !== 'not defined') {
      return resena.urlFoto;
    }
    const name = encodeURIComponent(`${resena.nombreUsuario || ''} ${resena.apellidoUsuario || ''}`.trim() || 'U');
    return `https://ui-avatars.com/api/?name=${name}&background=1f5fa8&color=fff&size=80`;
  }

  getIniciales(resena: Resena): string {
    const nombre = resena.nombreUsuario?.charAt(0) || '';
    const apellido = resena.apellidoUsuario?.charAt(0) || '';
    return (nombre + apellido).toUpperCase() || 'U';
  }

  abrirImagen(url: string): void {
    this.imagenAmpliada = url;
  }

  cerrarImagen(): void {
    this.imagenAmpliada = null;
  }

  setFiltro(calificacion: number | null): void {
    this.filtroCalificacion = this.filtroCalificacion === calificacion ? null : calificacion;
  }

  formatearFecha(fecha?: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getCalificacionColor(cal: number): string {
    if (cal >= 4) return '#22c55e';
    if (cal >= 3) return '#f59e0b';
    return '#ef4444';
  }
}
