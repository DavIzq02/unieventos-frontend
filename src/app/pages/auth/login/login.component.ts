import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    // if (!this.authService.esCorreoValido(email)) {
    //   Swal.fire({
    //     title: 'Acceso denegado',
    //     text: 'Solo se permite el ingreso con correos institucionales @unimagdalena.edu.co',
    //     icon: 'error',
    //     confirmButtonColor: '#1f5fa8'
    //   });
    //   return;
    // }

    this.cargando = true;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.codigo === 200 && res.data) {
          this.authService.guardarUsuario(res.data.nombre);
          Swal.fire({
            title: `Bienvenido ${res.data.nombre}`,
            text: 'Disfruta de los eventos',
            icon: 'success',
            confirmButtonColor: '#1f5fa8'
          }).then(() => {
            const usuario = {
              id: res.data.id,
              nombre: res.data.nombre,
              apellido: res.data.apellido,
              correo: res.data.correo,
              codigo: res.data.codigo,
              comunidad: res.data.comunidad,
              urlFoto: res.data.urlFoto,
              rol: res.data.rol,
            }

            this.authService.guardarUsuario(usuario);
            this.router.navigate(['/dashboard']);
          });
        } else {
          if (res.mensaje == "Usuario no existe") {
            Swal.fire({
              title: res.mensaje,
              text: "Crea tu usuario",
              icon: 'warning',
              confirmButtonColor: '#1f5fa8',
              confirmButtonText: "Crear cuenta"
            }).then(() => {
              this.router.navigate(['/login/crearcuenta']);
            });

            const nombreUsuario = email.split('@')[0];
            // const correo = email;
            // const contrasena = password;
            localStorage.setItem("nombreUsuario", nombreUsuario);
            // localStorage.setItem("correo", correo);
            // localStorage.setItem("contrasena", contrasena);
            this.router.navigate(['/login/crearcuenta']);
            return;
          }
          Swal.fire({
            title: 'Error',
            text: res.mensaje,
            icon: 'error',
            confirmButtonColor: '#1f5fa8'
          });
        }
      },
      error: () => {
        this.cargando = false;
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor',
          icon: 'error',
          confirmButtonColor: '#1f5fa8'
        });
      }
    });
  }

  irHome(): void {
    this.router.navigate(['/']);
  }
}