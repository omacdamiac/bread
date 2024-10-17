import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './procesos.component';
import { TitleModule } from '@shared/components';
import { BusquedaModule } from './components/busqueda/busqueda.module';
import { ProcesoModule } from './components/proceso/proceso.module';

@NgModule({
  declarations: [ProcesosComponent],
  exports: [ProcesosComponent],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    BusquedaModule,
    ProcesoModule,
    TitleModule,
  ],
})
export class ProcesosModule {}
