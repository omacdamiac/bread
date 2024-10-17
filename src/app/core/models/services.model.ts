import { HttpHeaders } from '@angular/common/http';

export interface ISERVICES {
  body?: IDATA;
  headers?: HttpHeaders[];
  ok?: boolean;
  status?: number;
  statusText?: string;
  type?: number;
  url?: string;
}

export interface ISERVICESP {
  data: any;
  message: string;
  status: number;
}


export interface IDATA {
  data?: any;
  message?: string;
  status?: number;
}
