import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuenciaComponent } from './secuencia.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/library';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonModule, InputModule } from '@shared/components';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SecuenciaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    SharedModule,
    MatTableModule,
    InputModule,
    ButtonModule,
MatIconModule,
MatPaginatorModule,
MatSortModule,
  ],
})
export class SecuenciaModule {}
