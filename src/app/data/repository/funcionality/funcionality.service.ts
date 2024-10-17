import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IFUNCIONALITY, ISERVICES, ISUBFUNCIONALITY } from '@core/models';

export const FUNCIONALITY_SERVICEM = new InjectionToken<FuncionalityServiceM>(
  'funcionality.service'
);

export interface FuncionalityServiceM {
  getFuncionality(): Observable<ISERVICES>;
  createFuncionality(request: IFUNCIONALITY): Observable<ISERVICES>;
  editFuncionality(body: IFUNCIONALITY): Observable<ISERVICES>;
//   deleteFuncionality(id: number): Observable<IFUNCIONALITY>;
  getSubFuncionality(): Observable<ISERVICES>;
  createSubFuncionality(request: ISUBFUNCIONALITY): Observable<ISERVICES>;
  editSubFuncionality(body: ISUBFUNCIONALITY): Observable<ISERVICES>;
//   deleteSubFuncionality(id: number): Observable<ISUBFUNCIONALITY>;
}
