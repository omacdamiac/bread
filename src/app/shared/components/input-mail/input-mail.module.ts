import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMailComponent } from './input-mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [InputMailComponent],
  exports: [InputMailComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class InputMailModule {}
