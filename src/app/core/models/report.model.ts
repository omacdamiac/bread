export interface IREPORT {
  id?: Number;
  tipo_documento: string;
  numero_documento: string;
  codigo_SBS: string;
  apellido_materno: string;
  apellido_paterno: string;
  nombres: string;
  detalle: IDETALLE[];
}
export interface IDETALLE {
  informacion_deudor: IDEUDOR[];
  informacion_entidad: IENTIDAD[];
}

export interface IDEUDOR {
  ano: string;
  mes: string;
  tipo_persona: string;
  tipo_empresa: string;
  Deuda_clasificacion0: string;
  Deuda_clasificacion1: string;
  Deuda_clasificacion2: string;
  Deuda_clasificacion3: string;
  Deuda_clasificacion4: string;
}

export interface IENTIDAD {
  Codigo: string;
  entidad_reportante: string;
  tipo_credito: string;
  cuenta_contable: string;
  dias_atraso: string;
  saldo: string;
}
