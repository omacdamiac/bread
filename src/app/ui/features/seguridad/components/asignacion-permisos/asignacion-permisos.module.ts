import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionPermisosRoutingModule } from './asignacion-permisos-routing.module';
import { AsignacionPermisosComponent } from './asignacion-permisos.component';
import {
  ButtonModule,
  InputModule,
  SelectModule,
  TitleModule,
} from '@shared/components';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsuariosModule } from '../../partials/usuarios/usuarios.module';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '@shared/library';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [AsignacionPermisosComponent],
  exports: [AsignacionPermisosComponent],
  imports: [
    CommonModule,
    AsignacionPermisosRoutingModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    ButtonModule,
    InputModule,
    TitleModule,
    SelectModule,
    UsuariosModule,
  ],
})
export class AsignacionPermisosModule {}
