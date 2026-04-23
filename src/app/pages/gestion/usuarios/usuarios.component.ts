import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: any[] = [];
  mostrarModal: boolean = false;
  modoCrear: boolean = true;
  formularioUsuario: FormGroup = new FormGroup({});
  listaRoles: any[] = [];
  listaComunidades: any[] = [];
  usuario: any = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    codigo: '',
    rol: {
      id: ''
    },
    comunidad: {
      id: ''
    },
    activo: true
  };
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getComunidades();
    this.getRoles();
  }
  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe((usuarios: any) => {
      this.listaUsuarios = usuarios.listaRespuesta;
    });
  }
  getComunidades() {
    this.usuariosService.getComunidades().subscribe((comunidades: any) => {
      this.listaComunidades = comunidades.listaRespuesta;
    });
  }
  getRoles() {
    this.usuariosService.getRoles().subscribe((roles: any) => {
      this.listaRoles = roles.listaRespuesta;
    });
  }
  cambiarEstadoUsuario(usuario: any) {
    const payload = {
      id: usuario.id,
      activo: !usuario.activo
    }
    this.usuariosService.cambiarEstadoUsuario(payload).subscribe((respuesta: any) => {
      if (respuesta.codigo == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Estado del usuario cambiado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.getUsuarios();
      } else {
        console.log(respuesta);
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar el estado del usuario',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
  abrirModalEditar(usuario: any) {
    console.log(usuario);
    this.modoCrear = false;
    this.usuario = { ...usuario };

    if (!this.usuario.rol) this.usuario.rol = { id: '' };
    if (!this.usuario.comunidad) this.usuario.comunidad = { id: '' };

    this.mostrarModal = true;
  }
  cerrarModalEditar() {

  }
  eliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: 'No se podrá deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(id).subscribe((respuesta: any) => {
          if (respuesta.codigo == 200) {
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.getUsuarios();
          } else {
            console.log(respuesta);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el usuario',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  abrirModalCrear() {
    this.modoCrear = true;
    this.mostrarModal = true;
    this.usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      codigo: '',
      rol: {
        id: ''
      },
      comunidad: {
        id: ''
      },
      activo: true
    };
  }
  cerrarModalCrear() {
    this.mostrarModal = false;
  }

  guardarUsuario() {
    if (this.modoCrear) {
      console.log("this.usuario", this.usuario);
      this.usuariosService.crearUsuario(this.usuario).subscribe((respuesta: any) => {
        this.getUsuarios();
        this.cerrarModal();
      });
    } else {
      this.usuariosService.actualizarUsuario(this.usuario).subscribe((respuesta: any) => {
        if (respuesta.codigo == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.getUsuarios();
          this.cerrarModal();
        } else {
          console.log(respuesta);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el usuario',
            showConfirmButton: false,
            timer: 1500
          });
        }

      });
    }
  }
}
