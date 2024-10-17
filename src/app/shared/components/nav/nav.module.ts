import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ]
})
export class NavModule { }
