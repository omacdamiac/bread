import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoComponent } from './monitoreo.component';
import { TEXTAPP } from '@shared/const';

const routes: Routes = [
  {path: TEXTAPP.TEXT_ZERO, component: MonitoreoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoreoRoutingModule { }
