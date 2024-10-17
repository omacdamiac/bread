import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ISERVICES } from '@core/models';

export const ASSIGN_SERVICEM = new InjectionToken<AssignServiceM>(
  'reports.service'
);

export interface AssignServiceM {
  getAssign(): Observable<ISERVICES[]>;
  createAssign(request: any): Observable<ISERVICES>;
  editAssign(request: any): Observable<ISERVICES>;
  getAssignPF(): Observable<ISERVICES[]>;
  createAssignPF(request: any): Observable<ISERVICES>;
}
