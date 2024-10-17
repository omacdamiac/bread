import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule, DateYearsModule, DatepickerModule, DatepickerMonthModule, DatepickerRangeModule, InputModule, SelectModule, TableModule } from '@shared/components';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedModule } from '@shared/library';
import { DatosClienteModule } from '../../partials';

@NgModule({
  declarations: [
    ReporteComponent,
  ],
  exports: [
    ReporteComponent,
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedModule,
    InputModule,
    ButtonModule,
    SelectModule,
    DateYearsModule,
    DatepickerModule,
    DatepickerMonthModule,
    DatepickerRangeModule,
    TableModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    DatosClienteModule,
  ]
})
export class ReporteModule {}
