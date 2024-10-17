import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { headerPipe, orderPipe, typeOfPipe } from '@core/pipes';

@NgModule({
  declarations: [headerPipe, typeOfPipe, orderPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    headerPipe,
    typeOfPipe,
    orderPipe,
  ],
})
export class SharedModule {}
