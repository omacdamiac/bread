import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  { path: TEXTAPP.TEXT_ZERO, component: MantenimientoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
