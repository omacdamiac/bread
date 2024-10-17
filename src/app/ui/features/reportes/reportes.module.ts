import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { TitleModule } from '@shared/components';
import { BusquedaModule } from './components/busqueda/busqueda.module';
import { ReporteModule } from './components/reporte/reporte.module';


@NgModule({
  declarations: [
    ReportesComponent
  ],
  exports: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    BusquedaModule,
    ReporteModule,
    TitleModule,
  ]
})
export class ReportesModule { }
