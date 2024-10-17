import { InjectionToken } from '@angular/core';
import { IMONITORING, ISERVICES } from '@core/models';
import { Observable } from 'rxjs';

export const MONITORING_SERVICEM = new InjectionToken<MonitoringServiceM>(
  'monitoring.service'
);
export interface MonitoringServiceM {
  getProcessesJob(payload: any): Observable<ISERVICES>;
  getJobDetail(detalle: number): Observable<ISERVICES>;
}
