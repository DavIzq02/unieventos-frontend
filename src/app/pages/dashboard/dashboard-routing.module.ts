import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard/asistencia', component: AsistenciaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }