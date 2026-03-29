import { Component, Input } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() logoSrc: string = 'assets/img/logo.png';
  @Input() showUserBtn: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}