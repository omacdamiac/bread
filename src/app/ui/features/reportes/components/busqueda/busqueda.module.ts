import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { BusquedaComponent } from './busqueda.component';
import { AutocompleteModule, ButtonModule } from '@shared/components';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BusquedaComponent],
  exports: [BusquedaComponent],
  imports: [
    CommonModule,
    BusquedaRoutingModule,
    RouterModule,
    ButtonModule,
    MatCardModule,
    MatButtonModule,
    AutocompleteModule,
  ],
})
export class BusquedaModule {}
