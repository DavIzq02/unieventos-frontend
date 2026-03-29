import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
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

    if (!this.authService.esCorreoValido(email)) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Solo se permite el ingreso con correos institucionales @unimagdalena.edu.co',
        icon: 'error',
        confirmButtonColor: '#1f5fa8'
      });
      return;
    }

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
            this.router.navigate(['/dashboard']);
          });
        } else {
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