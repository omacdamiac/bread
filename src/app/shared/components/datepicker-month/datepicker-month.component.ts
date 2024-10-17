import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';

// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatepickerMonthComponent implements OnInit {
  date = new FormControl(moment());

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
        moment(),
        this.required ? dateRegexValidator : null
      )
    );
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.formParent.controls[this.name].value;
    ctrlValue.year(normalizedYear.year())
    console.log(normalizedYear.year());
    this.formParent.controls[this.name].setValue(ctrlValue);
  }
  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.formParent.controls[this.name].value;
    ctrlValue.month(normalizedMonth.month())

    console.log(normalizedMonth.month());
    // this.date.setValue(ctrlValue);
    this.formParent.controls[this.name].setValue(ctrlValue);

    datepicker.close();
  }
}
export function dateRegexValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const regexPattern =
    /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\d{4}$/gi;
  let val = control.value;
  const isValid = regexPattern.test(val);

  if (isValid) {
    return { dateRegex: true };
  }
  return null;
}
