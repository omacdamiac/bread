import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesoComponent } from './proceso.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  {path: TEXTAPP.TEXT_ZERO, component: ProcesoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRoutingModule { }
