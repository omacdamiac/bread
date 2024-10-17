import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { ButtonModule, SelectModule, TitleModule } from '@shared/components';
import { SharedModule } from '@shared/library';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FuncionalidadModule,
  PerfilModule,
  RolModule,
  SubfuncionalidadModule,
} from '../../partials';

@NgModule({
  declarations: [MantenimientoComponent],
  exports: [MantenimientoComponent],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    ButtonModule,
    SelectModule,
    TitleModule,
    PerfilModule,
    FuncionalidadModule,
    RolModule,
    SubfuncionalidadModule,
  ],
})
export class MantenimientoModule {}
