export interface IFUNCIONALITY {
  id_funcionalidad?: number;
  nombre_funcionalidad: string;
  link: string;
  icono: string;
  fecha_creacion: string | Date;
  estado: number;
}

export interface ISUBFUNCIONALITY {
  id_subfuncionalidad?: number;
  id_funcionalidad: number;
  nombre_subfuncionalidad: string;
  link: string;
  icono: string;
  fecha_creacion: string | Date;
  estado: number;
}
