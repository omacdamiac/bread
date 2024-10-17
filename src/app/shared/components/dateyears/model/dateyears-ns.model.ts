export namespace DateYearsNsModel {
  export interface DateYearsInt {
    label: string;
    placeholder: string;
    required: boolean;
    name: string;
    value?: string;
  }
  /**
        @param label: string
        @param placeholder: string
        @param required: boolean
        @param name: string
        @param value: string
     */

  export class DateYearsClass {
    label: string;
    placeholder: string;
    required: boolean;
    name: string;
    value?: string;

    constructor(
      labelp: string,
      placeholderp: string,
      required: boolean,
      namep: string,
      valuep?: string
    ) {
      this.label = labelp;
      this.placeholder = placeholderp;
      this.required = required;
      this.name = namep;
      this.value = valuep;
    }
  }
}
