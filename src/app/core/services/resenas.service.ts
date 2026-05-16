import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaApiService } from './ruta-api.service';

export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
  listaRespuesta?: any[];
}

export interface Resena {
  id: number;
  titulo?: string;
  descripcion: string;
  calificacion: number;
  fechaCreacion?: string;
  idEvento?: number;
  idAsistencia?: number;
  nombreUsuario?: string;
  apellidoUsuario?: string;
  urlFoto?: string;
  nombreEvento?: string;
  listaMultimedia?: ResenaMultimedia[];
  multimedia?: any;
}

export interface ResenaMultimedia {
  id: number;
  urlImagen: string;
  idResena?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResenasService {

  private raiz = '/api/';
  private resenaResource = RutaApiService.getPath() + this.raiz + 'resena/';
  private resenaMultimediaResource = RutaApiService.getPath() + this.raiz + 'resena-multimedia/';

  constructor(private http: HttpClient) { }

  /** Obtener todas las reseñas de un evento */
  getResenasByEvento(idEvento: number): Observable<JsonResponse> {
    const evento = {
      id: idEvento
    }
    const ruta = `${this.resenaResource}listarByEvento`;
    return this.http.post<JsonResponse>(ruta, evento)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Obtener todas las reseñas de un usuario */
  getResenasByUsuario(idUsuario: number): Observable<JsonResponse> {
    const ruta = `${this.resenaResource}listarByUsuario/${idUsuario}`;
    return this.http.get<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Obtener todas las reseñas */
  getAllResenas(): Observable<JsonResponse> {
    const ruta = `${this.resenaResource}listAll`;
    return this.http.get<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }
  /** Obtener todas las reseñas */
  getAllResenasByUsuario(usuario: any): Observable<JsonResponse> {
    const ruta = `${this.resenaResource}listarPorUsuario`;
    return this.http.post<JsonResponse>(ruta, usuario)
      .pipe(catchError(err => throwError(() => err)));
  }


  /** Obtener calificación promedio de un evento */
  getCalificacionPromedio(idEvento: number): Observable<JsonResponse> {
    const ruta = `${this.resenaResource}calificacionPromedio/${idEvento}`;
    return this.http.get<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Obtener multimedia de una reseña específica */
  getMultimediaByResena(idResena: number): Observable<JsonResponse> {
    const ruta = `${this.resenaMultimediaResource}listarByResena/${idResena}`;
    return this.http.get<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Obtener toda la multimedia */
  getAllMultimedia(): Observable<JsonResponse> {
    const ruta = `${this.resenaMultimediaResource}listAll`;
    return this.http.get<JsonResponse>(ruta)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Crear una reseña */
  crearResena(resena: any): Observable<JsonResponse> {
    const ruta = `${this.resenaResource}create`;
    return this.http.post<JsonResponse>(ruta, resena)
      .pipe(catchError(err => throwError(() => err)));
  }

  /** Subir imagen multimedia de una reseña */
  subirMultimediaResena(idResena: number, imagen: File): Observable<JsonResponse> {
    const ruta = `${this.resenaMultimediaResource}create/${idResena}`;
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post<JsonResponse>(ruta, formData)
      .pipe(catchError(err => throwError(() => err)));
  }
}
