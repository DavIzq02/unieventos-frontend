import { Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment'; //descomentar si es local
import { environment } from '../../../environments/environment.prod'; //descomentar si se va a subir git
@Injectable({
  providedIn: 'root'
})
export class RutaApiService {

  /**
   * @description Path principal de la aplicación para conectarse con el back
   */
  static getPath(): string {
    return environment.apiUrl;
  }
}
