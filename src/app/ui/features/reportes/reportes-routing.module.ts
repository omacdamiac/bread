import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ROUTING, TEXTAPP } from '@shared/const';
import { ProcessesResolver } from '@src/app/data/services/processes/processes.resolver';

const routes: Routes = [
  {
    path: TEXTAPP.TEXT_ZERO,
    component: ReportesComponent,
    data: { breadcrumb: TEXTAPP.TEXT_ZERO },
    children: [
      {
        path: TEXTAPP.TEXT_ZERO,
        redirectTo: ROUTING.ROUTER_BUSQUEDA,
        pathMatch: ROUTING.PATH_MATCH,
      },
      {
        path: ROUTING.ROUTER_BUSQUEDA,
        component: BusquedaComponent,
        data: { breadcrumb: ROUTING.ROUTER_BUSQUEDA },
      },
      {
        path: ROUTING.ROUTER_REPORTE + '/:proceso',
        component: ReporteComponent,
        data: {
          breadcrumb: (data: any) => {
            return `${data.proceso.data[0].proceso}`;
          },
        },
        resolve: { proceso: ProcessesResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
