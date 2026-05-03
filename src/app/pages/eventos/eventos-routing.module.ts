import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisEventosComponent } from './mis-eventos/mis-eventos.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ModificarEventoComponent } from './modificar-evento/modificar-evento.component';

const routes: Routes = [
  { path: 'mis-eventos', component: MisEventosComponent },
  { path: 'crear-evento', component: CrearEventoComponent },
  { path: 'modificar-evento/:id', component: ModificarEventoComponent },
  { path: '', redirectTo: 'mis-eventos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }