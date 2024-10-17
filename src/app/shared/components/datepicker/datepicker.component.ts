import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() label!: string;
  @Input() value?: any;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() name!: string;
  @Input() required!: boolean;
  @Input() formParent!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.formParent.addControl(
      this.name,
      new FormControl(
        this.value === '' ? '' : this.value,
        this.required ? Validators.required : null
      )
    );
  }
}
