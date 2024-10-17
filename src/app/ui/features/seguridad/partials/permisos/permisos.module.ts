import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosComponent } from './permisos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '@shared/library';
import { ButtonModule, InputModule } from '@shared/components';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [PermisosComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    SharedModule,
    InputModule,
    ButtonModule,
    MatSlideToggleModule,
  ],
})
export class PermisosModule {}
