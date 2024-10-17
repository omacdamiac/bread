import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from './seguridad.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { AsignacionPermisosComponent } from './components/asignacion-permisos/asignacion-permisos.component';
import { ROUTING, TEXTAPP } from '@shared/const';

const routes: Routes = [
  {
    path: TEXTAPP.TEXT_ZERO,
    component: SeguridadComponent,
    data: { breadcrumb: TEXTAPP.TEXT_ZERO },
    children: [
      {
        path: TEXTAPP.TEXT_ZERO,
        redirectTo: ROUTING.ROUTER_MANTENIMIENTO,
        pathMatch: ROUTING.PATH_MATCH,
      },
      {
        path: ROUTING.ROUTER_MANTENIMIENTO,
        component: MantenimientoComponent,
        data: { breadcrumb: ROUTING.ROUTER_MANTENIMIENTO },
      },
      {
        path: ROUTING.ROUTER_ASIGNACION,
        component: AsignacionPermisosComponent,
        data: { breadcrumb: ROUTING.ROUTER_ASIGNACION },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
