import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ISERVICES } from '@core/models';

export const REPORTS_SERVICEM = new InjectionToken<ReportsServiceM>(
  'reports.service'
);

export interface ReportsServiceM {
  getReports(): Observable<ISERVICES[]>;
  getReport(endPoint: string): Observable<ISERVICES>;
}
