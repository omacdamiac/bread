import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { AsignacionPermisosModule } from './components/asignacion-permisos/asignacion-permisos.module';
import { MantenimientoModule } from './components/mantenimiento/mantenimiento.module';

@NgModule({
  declarations: [SeguridadComponent],
  exports: [SeguridadComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    AsignacionPermisosModule,
    MantenimientoModule,
  ],
})
export class SeguridadModule {}
