import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ISERVICES } from '@core/models';

export const PROCESSES_SERVICEM = new InjectionToken<ProcessesServiceM>(
  'processes.service'
);

export interface ProcessesServiceM {
  getProcesses(type: string): Observable<ISERVICES>;
  getData(id: number): Observable<ISERVICES>;
  getConsult(endpoint: string,payload: any): Observable<ISERVICES>;
  getParam(parametro: string): Observable<ISERVICES>;
}
