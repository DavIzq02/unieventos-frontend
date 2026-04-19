import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {

  DataNuevoUsuario = {
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    correo: "",
    contrasena: "",
    codigo: "",
    confirmarContrasena: "",
    urlFoto: "",
    foto: "",
    comunidad: {},
    listaEventosInteres: [] as any[]
  }
  comunidadSeleccionada: any = [];
  DataTipoEvento: any = [];
  DataComunidades: any = [];
  multiselectComunidades: any
  multiselectEventosInteres: any
  imagenSeleccionada: any;
  propiedadesMultiSelect = {
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
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    localStorage.clear();
    await this.obtenerTipoEventos();
    await this.obtenerComunidades();
  }

  async obtenerTipoEventos(): Promise<void> {

    this.multiselectEventosInteres = {
      ...this.propiedadesMultiSelect
    };
    try {
      const respuesta: any = await firstValueFrom(this.authService.getTipoEventos());
      this.DataTipoEvento = respuesta.listaRespuesta;
    } catch (error) {
      console.error("Error al obtener los tipos de eventos", error);
    }

  }

  async obtenerComunidades(): Promise<void> {
    this.multiselectComunidades = {
      singleSelection: true,
      ...this.propiedadesMultiSelect
    };
    try {
      const respuesta: any = await firstValueFrom(this.authService.getComunidades());
      this.DataComunidades = respuesta.listaRespuesta;
    } catch (error) {
      console.error("Error al obtener las comunidades", error);
    }
  }

  onImagenChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.imagenSeleccionada = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.DataNuevoUsuario.urlFoto = this.imagenSeleccionada;
        this.DataNuevoUsuario.foto = reader.result as string;
        console.log(this.DataNuevoUsuario.foto);
        console.log(this.DataNuevoUsuario.urlFoto)
      };
      reader.readAsDataURL(file);
    }

  }

  async validarFormulario() {
    const u = this.DataNuevoUsuario;

    if (
      !u.nombreUsuario?.trim() ||
      !u.apellido?.trim() ||
      !u.correo?.trim() ||
      !u.confirmarContrasena?.trim() ||
      !u.codigo?.trim()
    ) {
      Swal.fire({
        title: "Campos requeridos",
        text: "Por favor complete todos los campos",
        icon: "warning",
        confirmButtonText: "Aceptar"
      })
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(u.correo)) {
      Swal.fire({
        title: "Correo inválido",
        text: "Por favor ingrese un correo válido",
        icon: "warning",
        confirmButtonText: "Aceptar"
      })
      return;
    }

    // Validar longitud contraseña
    // if (u.contrasena.length < 6) {
    //   Swal.fire({
    //     title: "Contraseña inválida",
    //     text: "La contraseña debe tener al menos 6 caracteres",
    //     icon: "warning",
    //     confirmButtonText: "Aceptar"
    //   })
    //   return;
    // }

    // Validar arrays
    if (!this.comunidadSeleccionada) {
      Swal.fire({
        title: "Comunidad requerida",
        text: "Por favor seleccione una comunidad",
        icon: "warning",
        confirmButtonText: "Aceptar"
      })
      return;
    }

    if (!u.listaEventosInteres || u.listaEventosInteres.length === 0) {
      Swal.fire({
        title: "Eventos de interés requeridos",
        text: "Por favor seleccione al menos un evento de interés",
        icon: "warning",
        confirmButtonText: "Aceptar"
      })
      return;
    }
    this.DataNuevoUsuario.nombre = this.DataNuevoUsuario.nombreUsuario;
    this.DataNuevoUsuario.comunidad = this.comunidadSeleccionada[0];
    await this.guardarUsuario();
  }

  async guardarUsuario() {
    Swal.fire({
      title: "Configurando usuario...",
      text: "Por favor espere",
      icon: "info",
      confirmButtonText: "Aceptar"
    })
    Swal.showLoading();
    try {
      const nuevoUsuario = {
        nombre: this.DataNuevoUsuario.nombre,
        apellido: this.DataNuevoUsuario.apellido,
        correo: this.DataNuevoUsuario.correo,
        contrasena: this.DataNuevoUsuario.confirmarContrasena,
        codigo: this.DataNuevoUsuario.codigo,
        comunidad: this.DataNuevoUsuario.comunidad,
        //  listaEventosInteres: this.DataNuevoUsuario.listaEventosInteres todavia no funciona
      }
      const respuesta: any = await firstValueFrom(this.authService.crearUsuario(nuevoUsuario, this.imagenSeleccionada));
      if (respuesta.codigo == 200) {
        Swal.fire({
          title: "Bienvenido " + this.DataNuevoUsuario.nombre,
          text: "Ya puedes disfrutar de los eventos disponibles",
          icon: "success",
          confirmButtonText: "Aceptar"
        }).then(() => {
          const usuario = {
            id: respuesta.data.id,
            nombre: respuesta.data.nombre,
            apellido: respuesta.data.apellido,
            correo: respuesta.data.correo,
            codigo: respuesta.data.codigo,
            comunidad: respuesta.data.comunidad,
            urlFoto: respuesta.data.urlFoto,
            rol: respuesta.data.rol,
          }
          localStorage.removeItem("nombreUsuario");
          localStorage.removeItem("correo");
          localStorage.removeItem("contrasena");

          this.authService.guardarUsuario(usuario);
          this.router.navigate(['/dashboard']);
        });
      } else {
        console.log("RESPUESTA", respuesta)
        Swal.fire({
          title: "Error al crear usuario",
          text: respuesta.mensaje,
          icon: "error",
          confirmButtonText: "Aceptar"
        })
      }
    } catch (error: any) {
      console.error(error)
      Swal.fire({
        title: "Error al crear usuario",
        text: error.error.mensaje,
        icon: "error",
        confirmButtonText: "Aceptar"
      })
    }
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
