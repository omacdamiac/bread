import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionPermisosComponent } from './asignacion-permisos.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  { path: TEXTAPP.TEXT_ZERO, component: AsignacionPermisosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionPermisosRoutingModule {}
