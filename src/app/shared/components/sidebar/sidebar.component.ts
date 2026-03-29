import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen$!: Observable<boolean>;
  usuario: string = '';

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isOpen$ = this.sidebarService.isOpen$;
    this.usuario = this.authService.getUsuario();
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