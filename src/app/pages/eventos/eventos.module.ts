import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosRoutingModule } from './eventos-routing.module';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MisEventosComponent,
    CrearEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosModule { }