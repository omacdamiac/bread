import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent implements OnInit {
  @Input() label!: string;
  @Input() valueDesde?: any;
  @Input() valueHasta?: any;
  @Input() placeholderDesde!: string;
  @Input() nameDesde!: string;
  @Input() placeholderHasta!: string;
  @Input() nameHasta!: string;
  @Input() disabled: boolean = false;
  @Input() required!: boolean;
  @Input() formParent!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.formParent.addControl(
      this.nameDesde,
      new FormControl(
        this.valueDesde === '' ? '' : this.valueDesde,
        this.required ? Validators.required : null
      )
    );
    this.formParent.addControl(
      this.nameHasta,
      new FormControl(
        this.valueHasta === '' ? '' : this.valueHasta,
        this.required ? Validators.required : null
      )
    );
  }

}
