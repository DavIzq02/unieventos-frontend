import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GestionRoutingModule } from './gestion-routing.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../../shared/shared.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class GestionModule { }
