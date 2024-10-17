import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPROFILE,
  IRELATIONPF,
  IRELATIONRP,
  IROL,
  ISERVICES,
  IUSERS,
} from '@core/models';
import { END_POINTS, TEXTAPP } from '@shared/const';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { SecurityServiceM } from '../../repository';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecurityService implements SecurityServiceM {
  constructor(private http: HttpClient) {}

  // getProfile(): Observable<IPROFILE[]> {
  //   return this.http
  //     .get<IPROFILE[]>(environment.API + END_POINTS.PROFILE, {
  //       observe: 'body',
  //     })
  //     .pipe(map((observe: any) => observe[0]['data']));
  // }

  /*
   * TAB PROFILE
   */
  getProfile(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.PROFILE + END_POINTS.GET
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
  createProfile(request: IPROFILE): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.PROFILE + END_POINTS.POST,
      request
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'POST'));
  }
  editProfile(body: IPROFILE): Observable<ISERVICES> {
    return this.http.put<ISERVICES>(
      environment.API + END_POINTS.PROFILE + END_POINTS.PUT,
      body
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'PUT'));
  }
  // deleteProfile(id: number): Observable<IPROFILE> {
  //   let URL = environment.API + END_POINTS.PROFILE;
  //   return this.http.delete<IPROFILE>(URL + TEXTAPP.TEXT_BARRA + id);
  // }
  /*
   * TAB ROL
   */
  getRole(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.ROLES + END_POINTS.GET
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
  createRole(request: IROL): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.ROLES + END_POINTS.POST,
      request
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'POST'));
  }
  editRole(body: IROL): Observable<ISERVICES> {
    return this.http.put<ISERVICES>(
      environment.API + END_POINTS.ROLES + END_POINTS.PUT,
      body
      , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'PUT'));
  }
  // deleteRole(id: number): Observable<IROL> {
  //   let URL = environment.API + END_POINTS.ROLES;
  //   return this.http.delete<IROL>(URL + TEXTAPP.TEXT_BARRA + id);
  // }

  /*
   * TAB PERMISOS
   */
  getPermission(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(environment.API + END_POINTS.PERMISSIONS, {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
  // createPermission(request: IPERMISSION) {
  //   return this.http.post<IPERMISSION>(
  //     environment.API + END_POINTS.PERMISSIONS + TEXTAPP.TEXT_BARRA,
  //     request
  //   );
  // }
  // editPermission(body: IPERMISSION) {
  //   return this.http.put<IPERMISSION>(
  //     environment.API + END_POINTS.PERMISSIONS + TEXTAPP.TEXT_BARRA,
  //     body
  //   );
  // }
  // deletePermission(id: number): Observable<IPERMISSION> {
  //   return this.http.delete<IPERMISSION>(
  //     environment.API + END_POINTS.PERMISSIONS + TEXTAPP.TEXT_BARRA + id
  //   );
  // }

  /*
   * RELACION ROL-PERMISO
   */
  getRelationRP(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.RELATIONRP + END_POINTS.GET
    );
  }
  createRelation(request: IRELATIONRP): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.RELATIONRP + END_POINTS.POST,
      request
    );
  }
  editRelation(body: ISERVICES): Observable<ISERVICES> {
    return this.http.put<ISERVICES>(
      environment.API + END_POINTS.RELATIONRP + END_POINTS.PUT,
      body
    );
  }

  /*
   * RELACION PERFIL
   */
  getRelationPF(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.RELATIONPF + END_POINTS.GET
    );
  }
  createRelationPF(request: IRELATIONPF): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.RELATIONPF + END_POINTS.POST,
      request
    );
  }
  editRelationPF(body: IRELATIONPF): Observable<ISERVICES> {
    return this.http.put<ISERVICES>(
      environment.API + END_POINTS.RELATIONPF + END_POINTS.PUT,
      body
    );
  }
  /*
   * TAB USERS
   */
  getUsers(): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.USERS + END_POINTS.GET
    );
  }
  createUser(request: IUSERS): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.USERS + END_POINTS.POST,
      request
    );
  }
  editUser(body: IUSERS): Observable<ISERVICES> {
    return this.http.put<ISERVICES>(
      environment.API + END_POINTS.USERS + END_POINTS.PUT,
      body
    );
  }

  /*
   * VISTA ASIGNACIÓN
   */
  // getProfile(): Observable<IPROFILE[]> {
  //   return this.http.get<IPROFILE[]>(environment.API + END_POINTS.PROFILE);
  // }
}
