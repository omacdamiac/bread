export interface iMAIN {
  id: number;
  nombre_funcionalidad: string;
  link: string;
  icono: string;
  fecha_creacion: string;
  estado: number;
  childs?: iCHILD[];
}
export interface iCHILD {
  id: number;
  id_funcionalidad: number;
  nombre_subfuncionalidad: string;
  link: string;
  icono: string;
  fecha_creacion: string;
  estado: number;
}
