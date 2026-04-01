import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../pages/auth/auth.service';
import { RutaApiService } from 'src/app/core/services/ruta-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen$!: Observable<boolean>;
  usuario: any;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isOpen$ = this.sidebarService.isOpen$;
    this.usuario = this.authService.obtenerUsuario();
    if (this.usuario.urlFoto != "not defined") {
      this.usuario.urlFoto = RutaApiService.getPath() + this.usuario.urlFoto;
    }
  }
  onImgError(event: any) {
    event.target.src = 'assets/img/user-default.png';
  }
  close() {
    this.sidebarService.close();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.close();
    this.router.navigate(['/']);
  }
}