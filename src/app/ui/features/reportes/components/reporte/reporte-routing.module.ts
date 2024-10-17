import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  {path: TEXTAPP.TEXT_ZERO, component: ReporteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
