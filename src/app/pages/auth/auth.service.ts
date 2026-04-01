import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RutaApiService } from '../../core/services/ruta-api.service';

export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
  listaRespuesta?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private raiz = "/api/";
  private usuarioResource = RutaApiService.getPath() + this.raiz + 'usuario/';
  private eventoResource = RutaApiService.getPath() + this.raiz + 'evento/';
  private comunidadResource = RutaApiService.getPath() + this.raiz + 'comunidad/';

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<JsonResponse> {
    const rutaLogin = this.usuarioResource + 'login';
    const params = {
      correo: correo,
      contrasena: contrasena
    };

    return this.http.post<JsonResponse>(rutaLogin, params)
      .pipe(catchError(err => throwError(() => err)));
  }

  getTipoEventos(): Observable<JsonResponse> {
    const rutaEventos = this.eventoResource + 'listAll';
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  getComunidades(): Observable<JsonResponse> {
    const rutaComunidades = this.comunidadResource + 'listAll';
    return this.http.get<JsonResponse>(rutaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  crearUsuario(nuevoUsuario: any, imagen: File | null): Observable<any> {
    const formData = new FormData();

    // Enviar el objeto como Blob con Content-Type application/json
    const blob = new Blob([JSON.stringify(nuevoUsuario)], {
      type: 'application/json'
    });

    formData.append('data', blob);

    // La imagen es opcional
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    const rutaCrearUsuario = this.usuarioResource + 'createPostLogin';
    return this.http.post<any>(rutaCrearUsuario, formData)
      .pipe(catchError(err => throwError(() => err)));
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario(): any {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  eliminarUsuario() {
    localStorage.removeItem('usuario');
  }

  cerrarSesion(): void {
    this.eliminarUsuario();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  esCorreoValido(email: string): boolean {
    return email.endsWith('@unimagdalena.edu.co');
  }
}