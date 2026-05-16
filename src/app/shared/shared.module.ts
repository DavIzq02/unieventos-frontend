import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AsistenciaComponent } from '../pages/dashboard/asistencia/asistencia.component';
import { EventoPdfComponent } from '../core/services/PDF/evento-pdf/evento-pdf.component';
import { ResenasConImagenPipe } from './pipes/resenas-con-imagen.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidebarComponent,
    AsistenciaComponent,
    EventoPdfComponent,
    ResenasConImagenPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularMultiSelectModule,
    ZXingScannerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidebarComponent,
    RouterModule,
    FormsModule,
    AngularMultiSelectModule,
    ZXingScannerModule,
    EventoPdfComponent,
    ResenasConImagenPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
