import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, DatepickerModule, DatepickerMonthModule, DatepickerRangeModule, InputModule, SelectModule, TableModule } from '@shared/components';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { ProcesoComponent } from './proceso.component';
import { ProcesoRoutingModule } from './proceso-routing.module';
import { SharedModule } from '@shared/library';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import * as moment from 'moment';
import { DateYearsModule } from '@shared/components/dateyears/dateyears.module';

@NgModule({
  declarations: [ProcesoComponent],
  exports: [ProcesoComponent],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    SharedModule,
    InputModule,
    ButtonModule,
    SelectModule,
    TableModule,
    DateYearsModule,
    DatepickerModule,
    DatepickerMonthModule,
    DatepickerRangeModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [{ provide: 'moment', useValue: moment }]

})
export class ProcesoModule {}
