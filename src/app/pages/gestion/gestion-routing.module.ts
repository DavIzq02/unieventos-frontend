import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'mi-perfil', component: MiPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }