import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { MiPerfilService } from './mi-perfil.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  imagenSeleccionada: any;
  usuario = {
    nombre: 'Juan Pérez',
    apellido: 'Pérez',
    correo: 'juan.perez@example.com',
    codigo: '123456789',
    comunidad: {
      nombre: 'Comunidad 1'
    },
    rol: {
      nombre: 'Rol 1'
    },
    urlFoto: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
  };

  constructor(private service: MiPerfilService, private authService: AuthService) {
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario.urlFoto != 'not defined') {
      this.usuario.urlFoto = this.usuario.urlFoto;
    }
  }

  async cambiarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e: any) => {
      const file = e.target.files[0];

      if (!file) return;

      this.imagenSeleccionada = file;

      // loading después de seleccionar
      Swal.fire({
        title: "Un momento",
        text: "Actualizando foto de perfil...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const respuesta: any = await firstValueFrom(
          this.service.actualizarFotoUsuario(this.usuario, this.imagenSeleccionada)
        );

        if (respuesta.codigo == 200) {
          // Vista previa
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.usuario.urlFoto = event.target.result;
          };
          reader.readAsDataURL(file);
          Swal.fire({
            title: "Foto actualizada",
            text: "La foto ha sido actualizada exitosamente",
            icon: "success"
          }).then(() => {
            this.usuario.urlFoto = respuesta.data.urlFoto;
          });
        } else {
          Swal.fire(
            {
              title: "Error",
              text: "Error al actualizar la foto",
              icon: "error",
              footer: respuesta.mensaje,
              confirmButtonText: "Aceptar"
            }
          );
        }

      } catch (error) {
        console.error("Error al actualizar la foto", error);
        Swal.fire("Error", "Error en la petición", "error");
      }
    };

    input.click();
  }
}
