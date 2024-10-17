import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosClienteComponent } from './datos-cliente.component';
import { SharedModule } from '@shared/library';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from '@shared/components';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DatosClienteComponent],
  exports: [DatosClienteComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class DatosClienteModule {}
