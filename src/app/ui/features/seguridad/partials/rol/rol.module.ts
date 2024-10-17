import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolComponent } from './rol.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '@shared/library';
import { ButtonModule, InputModule } from '@shared/components';

@NgModule({
  declarations: [RolComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
    SharedModule,
    InputModule,
    ButtonModule,
  ],
})
export class RolModule {}
