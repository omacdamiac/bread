import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoComponent } from './monitoreo.component';
import {
  ButtonModule,
  DatepickerModule,
  InputModule,
  SelectModule,
  TitleModule,
} from '@shared/components';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '@shared/library';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SecuenciaModule } from './partial';

@NgModule({
  declarations: [MonitoreoComponent],
  exports: [MonitoreoComponent],
  imports: [
    CommonModule,
    MonitoreoRoutingModule,
    SharedModule,
    ButtonModule,
    InputModule,
    SelectModule,
    DatepickerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    TitleModule,
    MatTooltipModule,
    MatIconModule,
    SecuenciaModule,
  ],
})
export class MonitoreoModule {}
