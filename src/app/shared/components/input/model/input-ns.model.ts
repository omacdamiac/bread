export namespace InputNsModel {
  export interface InputInt {
    label: string;
    place: string;
    required: boolean;
    name: string;
    type: string;
    disabled?: boolean;
    rows?: string;
    value?: string;
  }
  /**
        @param label: string
        @param place: string
        @param required: boolean
        @param name: string
        @param type: string
        @param disabled: boolean
        @param rows: string
        @param value: string
     */

  export class InputClass {
    label: string;
    place: string;
    required: boolean;
    name: string;
    type: string;
    disabled?: boolean;
    rows?: string;
    value?: string;

    constructor(
      labelp: string,
      placep: string,
      required: boolean,
      namep: string,
      typep: string,
      disabledp: boolean = false,
      rowsp?: string,
      valuep?: string
    ) {
      this.label = labelp;
      this.place = placep;
      this.required = required;
      this.name = namep;
      this.type = typep;
      this.disabled = disabledp;
      this.rows = rowsp;
      this.value = valuep;
    }
  }
}