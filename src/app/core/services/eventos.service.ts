import { Injectable } from '@angular/core';
import { Evento } from '../../shared/models/evento.model';
import { MyEvento } from '../../shared/models/my-evento.model';
import { RutaApiService } from './ruta-api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
  listaRespuesta?: Evento[];
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private raiz = "/api/";
  private tipoEventoResource = RutaApiService.getPath() + this.raiz + 'tipos-eventos/';
  private eventosResource = RutaApiService.getPath() + this.raiz + 'evento/';
  private eventosComunidadResource = RutaApiService.getPath() + this.raiz + 'evento-comunidad/';
  private eventosInteresResource = RutaApiService.getPath() + this.raiz + 'interes-usuario/';
  private comunidadResource = RutaApiService.getPath() + this.raiz + 'comunidad/';
  private jornadasResource = RutaApiService.getPath() + this.raiz + 'jornada-evento/';
  constructor(private http: HttpClient) { }

  /** METODOS GET DE LOS EVENTOS **/
  getEventosActuales(): Observable<JsonResponse> {
    const rutaEventos = this.eventosResource + 'listarEventosActivos';
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  getProximosEventos(): Observable<JsonResponse> {
    const rutaEventos = this.eventosResource + 'listarEventosProximos';
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  getEventosInteres(): Observable<JsonResponse> {
    const usuario: any = JSON.parse(localStorage.getItem('usuario')!);
    const rutaEventos = this.eventosInteresResource + 'listarByInteres';
    return this.http.post<JsonResponse>(rutaEventos, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }

  getEventosByUsuario(): Observable<JsonResponse> {
    const usuario: any = JSON.parse(localStorage.getItem('usuario')!);
    const rutaEventos = this.eventosResource + 'listarByUsuario';
    return this.http.post<JsonResponse>(rutaEventos, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }

  getEventosComunidad(): Observable<JsonResponse> {
    const usuario: any = JSON.parse(localStorage.getItem('usuario')!);
    const rutaEventos = this.eventosComunidadResource + 'listarByComunidad';
    return this.http.post<JsonResponse>(rutaEventos, usuario.comunidad)
      .pipe(catchError(err => throwError(() => err)));
  }
  /** ************************************************** **/

  /** METODOS PARA LA CREACION DE EVENTOS **/
  getComunidades(): Observable<JsonResponse> {
    const rutaComunidades = this.comunidadResource + 'listAll';
    return this.http.get<JsonResponse>(rutaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  getTipoEventos(): Observable<JsonResponse> {
    const rutaEventos = this.tipoEventoResource + 'listAll';
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  crearEvento(nuevoEvento: any): Observable<JsonResponse> {
    const rutaEventos = this.eventosResource + 'create';
    return this.http.post<JsonResponse>(rutaEventos, nuevoEvento)
      .pipe(catchError(err => throwError(() => err)));
  }

  crearEventoComunidad(listaComunidades: any, idEvento: number): Observable<JsonResponse> {
    const ruta = `${this.eventosComunidadResource}create/${idEvento}`;
    return this.http.post<JsonResponse>(ruta, listaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  crearJornadasEvento(listaJornadas: any): Observable<JsonResponse> {
    const ruta = `${this.jornadasResource}createJornadas`;
    return this.http.post<JsonResponse>(ruta, listaJornadas)
      .pipe(catchError(err => throwError(() => err)));
  }

  upLoadPortadaEvento(id: number, imagen: File): Observable<JsonResponse> {
    const ruta = `${this.eventosResource}upLoadPortadaEvento/${id}`;
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post<JsonResponse>(ruta, formData)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** ************************************************** **/

  /** METODOS PARA LA INFORMACION DE EVENTOS **/
  getJornadasByEvento(evento: any): Observable<JsonResponse> {
    const rutaEventos = this.jornadasResource + 'listByEvento';
    return this.http.post<JsonResponse>(rutaEventos, evento)
      .pipe(catchError(err => throwError(() => err)));
  }

  getComunidadesSeleccionadasByEvento(idEvento: any): Observable<JsonResponse> {
    const rutaEventos = this.comunidadResource + 'listarbyEvento/' + idEvento;
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  getEventoByid(id: number): Observable<JsonResponse> {
    const rutaEventos = this.eventosResource + 'findById/' + id;
    return this.http.get<JsonResponse>(rutaEventos)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** ************************************************** **/

  /** METODOS PARA CERRAR EL CRUD DE EVENTOS **/
  updateEvento(eventoModificado: any): Observable<JsonResponse> {
    const rutaEventos = this.eventosResource + 'update';
    return this.http.put<JsonResponse>(rutaEventos, eventoModificado)
      .pipe(catchError(err => throwError(() => err)));
  }

  updateEventoComunidad(listaComunidades: any, idEvento: number): Observable<JsonResponse> {
    const ruta = `${this.eventosComunidadResource}update/${idEvento}`;
    return this.http.put<JsonResponse>(ruta, listaComunidades)
      .pipe(catchError(err => throwError(() => err)));
  }

  updateJornadasEvento(listaJornadas: any): Observable<JsonResponse> {
    const ruta = `${this.jornadasResource}updateJornadas`;
    return this.http.put<JsonResponse>(ruta, listaJornadas)
      .pipe(catchError(err => throwError(() => err)));
  }

  updatePortadaEvento(id: number, imagen: File): Observable<JsonResponse> {
    const ruta = `${this.eventosResource}updatePortadaEvento/${id}`;
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.put<JsonResponse>(ruta, formData)
      .pipe(catchError(err => throwError(() => err)));
  }


  deleteEvento(id: number): Observable<JsonResponse> {
    const ruta = `${this.eventosResource}delete/${id}`;
    return this.http.delete<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }

  inactivarEvento(id: number): Observable<JsonResponse> {
    const ruta = `${this.eventosResource}inactivar/${id}`;
    return this.http.put<JsonResponse>(ruta, [])
      .pipe(catchError(err => throwError(() => err)));
  }

}