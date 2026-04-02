import { Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';
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
