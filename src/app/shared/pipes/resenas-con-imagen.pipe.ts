import { Pipe, PipeTransform } from '@angular/core';
import { Resena } from '../../core/services/resenas.service';

@Pipe({
  name: 'resenasConImagen'
})
export class ResenasConImagenPipe implements PipeTransform {
  transform(resenas: Resena[]): number {
    if (!resenas) return 0;
    return resenas.filter(r => r.listaMultimedia && r.listaMultimedia.length > 0).length;
  }
}
