export namespace InputMailNsModel {
  export interface InputMailInt {
    label: string;
    place: string;
    required: boolean;
    name: string;
    disabled?: boolean;
    value?: string;
  }
  /**
        @param label: string
        @param place: string
        @param required: boolean
        @param name: string
        @param disabled: boolean
        @param value: string
     */

  export class InputMailClass {
    label: string;
    place: string;
    required: boolean;
    name: string;
    disabled?: boolean;
    value?: string;

    constructor(
      labelp: string,
      placep: string,
      required: boolean,
      namep: string,
      disabledp: boolean = false,
      valuep?: string
    ) {
      this.label = labelp;
      this.place = placep;
      this.required = required;
      this.name = namep;
      this.disabled = disabledp;
      this.value = valuep;
    }
  }
}