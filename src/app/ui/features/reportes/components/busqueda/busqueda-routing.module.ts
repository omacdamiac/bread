import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  {path: TEXTAPP.TEXT_ZERO, component: BusquedaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaRoutingModule { }
