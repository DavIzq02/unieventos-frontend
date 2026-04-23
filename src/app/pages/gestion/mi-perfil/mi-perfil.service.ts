import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RutaApiService } from '../../../core/services/ruta-api.service';

@Injectable({
  providedIn: 'root'
})
export class MiPerfilService {

  private raiz = "/api/";
  private usuarioResource = RutaApiService.getPath() + this.raiz + 'usuario/';

  constructor(private http: HttpClient) { }

  actualizarFotoUsuario(usuario: any, imagen: File | null): Observable<any> {
    const formData = new FormData();

    // Enviar el objeto como Blob con Content-Type application/json
    const blob = new Blob([JSON.stringify(usuario)], {
      type: 'application/json'
    });

    formData.append('data', blob);

    // La imagen es opcional
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    const rutaActualizarFotoUsuario = this.usuarioResource + 'updateFotoPerfil';
    return this.http.post<any>(rutaActualizarFotoUsuario, formData)
      .pipe(catchError(err => throwError(() => err)));
  }

}
