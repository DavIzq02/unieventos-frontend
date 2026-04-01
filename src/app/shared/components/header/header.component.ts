import { Component, Input } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { RutaApiService } from 'src/app/core/services/ruta-api.service';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() logoSrc: string = 'assets/img/logo.png';
  @Input() showUserBtn: boolean = false;
  usuario: any;

  constructor(private sidebarService: SidebarService, private authService: AuthService) {
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario.urlFoto != "not defined") {
      this.usuario.urlFoto = RutaApiService.getPath() + this.usuario.urlFoto;
    }
  }
  onImgError(event: any) {
    event.target.src = 'assets/img/logo.png';
  }
  toggleSidebar() {
    this.sidebarService.toggle();
  }
}