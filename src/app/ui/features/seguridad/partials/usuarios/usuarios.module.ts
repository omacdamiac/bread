import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { ButtonModule, InputMailModule, InputModule, SelectModule } from '@shared/components';
import { SharedModule } from '@shared/library';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    SelectModule,
    InputModule,
    InputMailModule,
    ButtonModule,
  ]
})
export class UsuariosModule { }
