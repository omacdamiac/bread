export interface IRELATIONRP {
  id_asigroles?: number;
  estado: number;
  fecha_creacion: string | Date;
  id_permiso: number;
  id_rol: number;
}

export interface IRELATIONPF {
  id_asigperfiles?: number;
  estado: number;
  fecha_creacion: string | Date;
  id_funcionalidad: number;
  id_perfiles: number;
}
