import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaApiService } from 'src/app/core/services/ruta-api.service';


export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
  listaRespuesta?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private raiz = "/api/";
  private usuarioResource = RutaApiService.getPath() + this.raiz + 'usuario/';
  private rolesResource = RutaApiService.getPath() + this.raiz + 'rol/';
  private comunidadResource = RutaApiService.getPath() + this.raiz + 'comunidad/';
  private listar = "listAll";
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<JsonResponse> {
    const rutaComunidades = this.usuarioResource + this.listar;
    return this.http.get<JsonResponse>(rutaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  crearUsuario(usuario: any): Observable<JsonResponse> {
    const rutaUsuario = this.usuarioResource + 'create';
    return this.http.post<JsonResponse>(rutaUsuario, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }

  actualizarUsuario(usuario: any): Observable<JsonResponse> {
    const rutaUsuario = this.usuarioResource + 'update';
    return this.http.put<JsonResponse>(rutaUsuario, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }

  cambiarEstadoUsuario(usuario: any): Observable<JsonResponse> {
    const rutaUsuario = this.usuarioResource + 'cambiar-estado';
    return this.http.put<JsonResponse>(rutaUsuario, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }
  eliminarUsuario(id: number): Observable<JsonResponse> {
    const rutaUsuario = `${this.usuarioResource}delete/${id}`;
    return this.http.delete<JsonResponse>(rutaUsuario)
      .pipe(catchError(err => throwError(() => err)));
  }


  getComunidades(): Observable<JsonResponse> {
    const rutaComunidades = this.comunidadResource + this.listar;
    return this.http.get<JsonResponse>(rutaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  getRoles(): Observable<JsonResponse> {
    const rutaRoles = this.rolesResource + this.listar;
    return this.http.get<JsonResponse>(rutaRoles)
      .pipe(catchError(err => throwError(() => err)));
  }

}
