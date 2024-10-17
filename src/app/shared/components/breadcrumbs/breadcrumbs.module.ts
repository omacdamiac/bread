import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SharedModule } from '../../library';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent],
  imports: [CommonModule, SharedModule, MatDividerModule, MatIconModule,],
})
export class BreadcrumbsModule {}
