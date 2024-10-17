import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule, InputModule } from '@shared/components';
import { SharedModule } from '@shared/library';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [PerfilComponent],
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
export class PerfilModule {}
