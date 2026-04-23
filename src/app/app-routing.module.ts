import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'eventos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/eventos/eventos.module').then(m => m.EventosModule)
  },
  {
    path: 'gestion',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/gestion/gestion.module').then(m => m.GestionModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }