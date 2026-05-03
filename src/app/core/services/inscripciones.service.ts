import { Injectable } from '@angular/core';
import { RutaApiService } from './ruta-api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private raiz = "/api/";

  private jornadasResource = RutaApiService.getPath() + this.raiz + 'jornada-evento/';
  private inscripcionesResource = RutaApiService.getPath() + this.raiz + 'preinscripcion-jornada/';
  private preInscripcionesResource = RutaApiService.getPath() + this.raiz + 'preinscripcion/';

  constructor(private http: HttpClient) { }

  /** METODOS GET DE LOS EVENTOS **/
  getUsuariosByJornada(jornada: any): Observable<JsonResponse> {
    const rutaEventos = this.inscripcionesResource + 'listarByJornada';
    return this.http.post<JsonResponse>(rutaEventos, jornada)
      .pipe(catchError(err => throwError(() => err)));
  }

  createPreinscripcion(inscripcion: any): Observable<JsonResponse> {
    const rutaEventos = this.preInscripcionesResource + 'create';
    return this.http.post<JsonResponse>(rutaEventos, inscripcion)
      .pipe(catchError(err => throwError(() => err)));
  }

  createPreinscripcionJornada(inscripcionJornada: any): Observable<JsonResponse> {
    const rutaEventos = this.inscripcionesResource + 'create';
    return this.http.post<JsonResponse>(rutaEventos, inscripcionJornada)
      .pipe(catchError(err => throwError(() => err)));
  }

  getPreinscripcion(inscripcion: any): Observable<JsonResponse> {
    const rutaEventos = this.preInscripcionesResource + 'listar';
    return this.http.post<JsonResponse>(rutaEventos, inscripcion)
      .pipe(catchError(err => throwError(() => err)));
  }

  getPreinscripcionJornadas(preinscripcion: any): Observable<JsonResponse> {
    const rutaEventos = this.inscripcionesResource + 'listar';
    return this.http.post<JsonResponse>(rutaEventos, preinscripcion)
      .pipe(catchError(err => throwError(() => err)));
  }

}