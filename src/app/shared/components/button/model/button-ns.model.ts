export namespace ButtonNsModel {
  export interface ButtonInt {
    texto: string;
    color: string;
    class?: string;
    load?: boolean;
  }
  /**
      @param texto: string
      @param color: string
      @param class?: string
      @param load?: boolean
    */

  export class ButtonClass {
    texto: string;
    color: string;
    class: string;
    load: boolean;

    constructor(textop: string, colorp: string, classp: string = '', loadp: boolean = false) {
      this.texto = textop;
      this.color = colorp;
      this.class = classp;
      this.load = loadp;
    }
  }
}
