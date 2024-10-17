export namespace SelectNsModel {
  export interface Select {
    label: string;
    name: string;
    required: boolean;
    value: any;
    options: Array<string>;
  }
  /**
        @param label: string
        @param name: string
        @param required: boolean
        @param value?: any
        @param options?: string
     */

  export class SelectClass {
    label: string;
    name: string;
    required: boolean;
    value: any;
    options: Array<any>;
    constructor(
      labelp: string,
      namep: string,
      requiredp: boolean,
      valuep: any = '',
      listp: Array<any> = []
    ) {
      this.label = labelp;
      this.name = namep;
      this.required = requiredp;
      this.value = valuep;
      this.options = listp;
    }
  }
}