import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TEXTAPP } from '@shared/const';
import { ConfiguracionComponent } from './configuracion.component';

const routes: Routes = [{ path: TEXTAPP.TEXT_ZERO, component: ConfiguracionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
