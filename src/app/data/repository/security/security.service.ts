import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IPROFILE,
  IRELATIONPF,
  IRELATIONRP,
  IROL,
  ISERVICES,
  IUSERS,
} from '@core/models';

export const SECURITY_SERVICEM = new InjectionToken<SecurityServiceM>(
  'security.service'
);

export interface SecurityServiceM {
  getProfile(): Observable<ISERVICES>;
  createProfile(request: IPROFILE): Observable<ISERVICES>;
  editProfile(body: IPROFILE): Observable<ISERVICES>;
  //   deleteProfile(): Observable<ISERVICES>;
  getRole(): Observable<ISERVICES>;
  createRole(request: IROL): Observable<ISERVICES>;
  editRole(body: IROL): Observable<ISERVICES>;
  //   deleteRole(): Observable<ISERVICES>;
  getPermission(): Observable<ISERVICES>;
  // createPermission(): Observable<ISERVICES>;
  // editPermission(): Observable<ISERVICES>;
  // deletePermission(): Observable<ISERVICES>;
  getRelationRP(): Observable<ISERVICES>;
  createRelation(request: IRELATIONRP): Observable<ISERVICES>;
  editRelation(body: ISERVICES): Observable<ISERVICES>;
  getRelationPF(): Observable<ISERVICES>;
  createRelationPF(request: IRELATIONPF): Observable<ISERVICES>;
  editRelationPF(body: IRELATIONPF): Observable<ISERVICES>;
  getUsers(): Observable<ISERVICES>;
  createUser(request: IUSERS): Observable<ISERVICES>;
  editUser(body: IUSERS): Observable<ISERVICES>;
}
