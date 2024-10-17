import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { BusquedaComponent } from './busqueda.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteModule, ButtonModule } from '@shared/components';
import { SharedModule } from '@shared/library';


@NgModule({
  declarations: [
    BusquedaComponent
  ],
  exports: [
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusquedaRoutingModule,
    ButtonModule,
    MatCardModule,
    MatButtonModule,
    AutocompleteModule,

  ]
})
export class BusquedaModule { }
