import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubfuncionalidadComponent } from './subfuncionalidad.component';
import { SharedModule } from '@shared/library';
import {
  ButtonModule,
  InputModule,
  SelectModule,
} from '@shared/components';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [SubfuncionalidadComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputModule,
    ButtonModule,
    SelectModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
})
export class SubfuncionalidadModule {}
