export namespace DatePickerRangeNsModel {
  export interface DatePickerRangeInt {
    label: string;
    placeholderDesde: string;
    placeholderHasta: string;
    required: boolean;
    nameDesde: string;
    nameHasta: string;
    valueDesde?: string;
    valueHasta?: string;
  }
  /**
        @param label: string
        @param placeholderDesde: string
        @param placeholderHasta: string
        @param required: boolean
        @param nameDesde: string
        @param nameHasta: string
        @param valueDesde: string
        @param valueHasta: string
     */

  export class DatePickerRangeClass {
    label: string;
    placeholderDesde: string;
    placeholderHasta: string;
    required: boolean;
    nameDesde: string;
    nameHasta: string;
    valueDesde?: string;
    valueHasta?: string;

    constructor(
      labelp: string,
      placeholderDesdep: string,
      placeholderHastap: string,
      required: boolean,
      nameDesdep: string,
      nameHastap: string,
      valueDesdep?: string,
      valueHastap?: string
    ) {
      this.label = labelp;
      this.placeholderDesde = placeholderDesdep;
      this.placeholderHasta = placeholderHastap;
      this.required = required;
      this.nameDesde = nameDesdep;
      this.nameHasta = nameHastap;
      this.valueDesde = valueDesdep;
      this.valueHasta = valueHastap;
    }
  }
}
