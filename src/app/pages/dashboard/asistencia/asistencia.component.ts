import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  eventoId!: number;
  jornadaId!: number;
  codigoAsistencia!: string;

  eventoDetalle: any = null;
  jornadaSeleccionada: any = null;
  listaComunidadesEvento: any[] = [];

  cargandoDatos: boolean = true;
  procesando: boolean = false;
  estaLogueado: boolean = false;

  // Formulario nuevo usuario
  DataNuevoUsuario = {
    nombre: "",
    apellido: "",
    correo: "",
    codigo: "", // se usará como código/documento y contraseña
    comunidad: { id: 0 },
    rol: { id: 0 },
    activo: true
  };

  comunidadPorDefecto: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventosService: EventosService,
    private inscripcionesService: InscripcionesService
  ) { }

  ngOnInit(): void {
    this.estaLogueado = this.authService.isLoggedIn();

    this.route.queryParams.subscribe(async params => {
      this.eventoId = Number(params['e']);
      this.jornadaId = Number(params['j']);
      this.codigoAsistencia = params['c'];

      if (this.eventoId && this.jornadaId && this.codigoAsistencia) {
        await this.cargarDatosEvento();
        if (this.estaLogueado) {
          await this.registrarAsistenciaDirecta();
        } else {
          await this.cargarComunidades(); // Para asignarle una al nuevo usuario
          this.cargandoDatos = false;
        }
      } else {
        Swal.fire('Error', 'Enlace QR inválido', 'error');
        this.router.navigate(['/']);
      }
    });
  }

  async cargarDatosEvento() {
    try {
      // Evento
      const resEvento: any = await firstValueFrom(this.eventosService.getEventoByid(this.eventoId));
      if (resEvento.codigo === 200) {
        this.eventoDetalle = resEvento.data || resEvento.listaRespuesta?.[0] || resEvento;

        // Jornadas
        const resJornadas: any = await firstValueFrom(this.eventosService.getJornadasByEvento({ id: this.eventoId, nombre: this.eventoDetalle.nombre }));
        if (resJornadas.codigo === 200 && resJornadas.listaRespuesta) {
          this.jornadaSeleccionada = resJornadas.listaRespuesta.find((j: any) => j.id === this.jornadaId);
        }

        // Comunidades
        const resComunidades: any = await firstValueFrom(this.eventosService.getComunidadesSeleccionadasByEvento(this.eventoId));
        if (resComunidades.codigo === 200) {
          this.listaComunidadesEvento = resComunidades.listaRespuesta;
        }
      }
    } catch (error) {
      console.error('Error cargando datos del evento', error);
    }
  }

  async cargarComunidades() {
    try {
      const res: any = await firstValueFrom(this.authService.getComunidades());
      if (res.codigo === 200 && res.listaRespuesta && res.listaRespuesta.length > 0) {
        this.comunidadPorDefecto = res.listaRespuesta[0];
      }
    } catch (e) {
      console.error("Error cargando comunidades por defecto", e);
    }
  }

  async registrarAsistenciaDirecta() {
    this.cargandoDatos = true;
    this.procesando = true;
    try {
      const usuario = this.authService.obtenerUsuario();
      await this.enviarAsistencia(usuario.id);
    } catch (error) {
      console.error(error);
      this.procesando = false;
    }
  }

  async loginUsuario(usuarioCreado: any) {
    // Iniciar sesion y guardar usuario en localstorage para dejarlo logueado
    const usuarioSesion = {
      id: usuarioCreado.id,
      nombre: usuarioCreado.nombre,
      apellido: usuarioCreado.apellido,
      correo: usuarioCreado.correo,
      codigo: usuarioCreado.codigo,
      comunidad: usuarioCreado.comunidad,
      urlFoto: usuarioCreado.urlFoto,
      rol: usuarioCreado.rol,
    };
    this.authService.guardarUsuario(usuarioSesion);

    await this.enviarAsistencia(usuarioCreado.id);
  }

  async submitRegistro() {
    if (!this.DataNuevoUsuario.nombre || !this.DataNuevoUsuario.apellido || !this.DataNuevoUsuario.correo || !this.DataNuevoUsuario.codigo || this.comunidadPorDefecto == null) {
      Swal.fire('Atención', 'Todos los campos son obligatorios', 'warning');
      return;
    }

    this.procesando = true;

    try {
      const nuevoUsuario = {
        nombre: this.DataNuevoUsuario.nombre,
        apellido: this.DataNuevoUsuario.apellido,
        correo: this.DataNuevoUsuario.correo,
        contrasena: this.DataNuevoUsuario.codigo,
        codigo: this.DataNuevoUsuario.codigo,
        comunidad: { id: this.comunidadPorDefecto.id },
        activo: true,
        rol: { id: 4 } //invitado
      };

      const respuestaCreacion: any = await firstValueFrom(this.authService.crearUsuarioInvitado(nuevoUsuario));
      if (respuestaCreacion.codigo === 200) {

        const usuarioCreado = respuestaCreacion.data;
        await this.loginUsuario(usuarioCreado);

      } else {
        if (respuestaCreacion.codigo === 501) {
          //no creo el usuario porque ya existia, entonces lo logueo
          const usuarioCreado = {
            ...nuevoUsuario,
            id: respuestaCreacion.data.id
          }
          await this.loginUsuario(usuarioCreado);
        } else {
          Swal.fire('Error', respuestaCreacion.mensaje || 'Error creando el usuario', 'error');
        }
        this.procesando = false;
      }

    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error.error?.mensaje || 'Ocurrió un error en el registro', 'error');
      this.procesando = false;
    }
  }

  async enviarAsistencia(usuarioId: number) {
    const asistencia = {
      evento: { id: this.eventoId, codigo: this.codigoAsistencia },
      jornada: { id: this.jornadaId },
      usuario: { id: usuarioId }
    };

    try {
      const respuesta = await firstValueFrom(this.inscripcionesService.createAsistencia(asistencia));
      if (respuesta.codigo === 200) {
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Asistencia registrada correctamente. ¡Visita más eventos!',
          icon: 'success',
          confirmButtonColor: '#2f80c3'
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire('Atención', respuesta.mensaje || 'No se pudo registrar la asistencia', 'warning').then(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', 'No se pudo registrar la asistencia', 'error').then(() => {
        this.router.navigate(['/dashboard']);
      });
    } finally {
      this.procesando = false;
    }
  }

  irAResenas(idEvento: number) {
    this.router.navigate(['/eventos/resenas', idEvento]);
  }
}
