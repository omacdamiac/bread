import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGEX } from '../../utils';

@Component({
  selector: 'app-input-mail',
  templateUrl: './input-mail.component.html',
  styleUrls: ['./input-mail.component.scss'],
})
export class InputMailComponent implements OnInit {
  @Input() label!: string;
  @Input() value?: any;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() name!: string;
  @Input() formControlName!: string;
  @Input() required!: boolean;
  @Input() formParent!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formParent.addControl(
      this.name,
      new FormControl(
        this.value === '' ? '' : this.value,
        // this.required ? Validators.required : null
        Validators.compose([
          Validators.required,
          // Validators.email
          Validators.pattern(REGEX.EMAIL),
        ])
      )
    );
  }
}
