import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionalidadComponent } from './funcionalidad.component';
import { SharedModule } from '@shared/library';
import {
  ButtonModule,
  InputModule,
  SelectModule,
} from '@shared/components';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FuncionalidadComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputModule,
    ButtonModule,
    SelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class FuncionalidadModule {}
