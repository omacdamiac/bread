export interface CHKF {
  id_funcionalidad: number;
  name?: string;
  nombre_funcionalidad?: string;
  checked: boolean;
  functionalities: CHKF[];
}

export interface CHKR {
    id_permiso: number;
    name?: string;
    nombre_permiso?: string;
    checked: boolean;
    permissions: CHKR[];
  }