import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../../features/home/home.component';
import { ConfiguracionComponent } from '../../features/configuracion/configuracion.component';
import { MonitoreoComponent } from '../../features/monitoreo/monitoreo.component';
import { ROUTING, TEXTAPP } from '@shared/const';

const routes: Routes = [
  {
    path: TEXTAPP.TEXT_ZERO,
    component: DashboardComponent,
    data: { breadcrumb: ROUTING.ROUTER_HOME },
    children: [
      {
        path: TEXTAPP.TEXT_ZERO,
        redirectTo: ROUTING.ROUTER_HOME,
        pathMatch: ROUTING.PATH_MATCH,
      },
      {
        path: ROUTING.ROUTER_HOME,
        component: HomeComponent,
        data: { breadcrumb: TEXTAPP.TEXT_ZERO },
      },
      {
        path: ROUTING.ROUTER_MONITOREO,
        component: MonitoreoComponent,
        data: { breadcrumb: ROUTING.ROUTER_MONITOREO },
      },
      {
        path: ROUTING.ROUTER_CONFIGURACION,
        component: ConfiguracionComponent,
        data: { breadcrumb: ROUTING.ROUTER_CONFIGURACION },
      },
      {
        path: ROUTING.ROUTER_SEGURIDAD,
        loadChildren: () =>
          import('../../features/seguridad/seguridad.module').then(
            (m) => m.SeguridadModule
          ),
        data: {
          breadcrumb: ROUTING.ROUTER_SEGURIDAD,
        },
      },
      {
        path: ROUTING.ROUTER_PROCESOS,
        loadChildren: () =>
          import('../../features/procesos/procesos.module').then(
            (m) => m.ProcesosModule
          ),
        data: {
          breadcrumb: ROUTING.ROUTER_PROCESOS,
        },
      },
      {
        path: ROUTING.ROUTER_REPORTES,
        loadChildren: () =>
          import('../../features/reportes/reportes.module').then(
            (m) => m.ReportesModule
          ),
        data: {
          breadcrumb: ROUTING.ROUTER_REPORTES,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
