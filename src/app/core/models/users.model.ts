export interface IUSERSLIST {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  fecha_creacion: string;
}

export interface IUSERSLOGIN {
  id: number;
  token: string;
  rol: string;
}

export interface IUSERS {
  id_usuario?: number;
  nombre: string;
  usuario: string;
  correo: string;
  fecha_creacion: string | Date;
  estado: number;
}
export interface ITOKEN {
  id: string;
  name: string;
  password: string;
  rol: number;
  profile: number;
  items: any[];
}
