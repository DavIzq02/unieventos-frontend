import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginResponse {
  codigo: number;
  mensaje: string;
  data?: { nombre: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api/usuario/login';

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { correo, contrasena })
      .pipe(catchError(err => throwError(() => err)));
  }

  guardarUsuario(nombre: string): void {
    localStorage.setItem('usuario', nombre);
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  esCorreoValido(email: string): boolean {
    return email.endsWith('@unimagdalena.edu.co');
  }
}