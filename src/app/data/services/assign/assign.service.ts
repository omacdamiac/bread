import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { END_POINTS, TEXTAPP } from '@shared/const';
import { environment } from '@src/environments/environment';
import { ISERVICES } from '@core/models';
import { Observable } from 'rxjs';
import { AssignServiceM } from '../../repository';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignService implements AssignServiceM {
  constructor(private http: HttpClient) {}

  /*
   * ASIGNACIONES DE ROL-PERMISOS
   */
  getAssign(): Observable<ISERVICES[]> {
    return this.http
      .get<ISERVICES[]>(environment.API + END_POINTS.ASSIGN + END_POINTS.GET, {
        observe: 'response',
      })
      .pipe(tap((x: any) => (x.body.metodo = 'GET')));
  }

  createAssign(request: any): Observable<ISERVICES> {
    return this.http
      .post<ISERVICES>(
        environment.API + END_POINTS.ASSIGN + END_POINTS.POST,
        request,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'POST')));
  }
  editAssign(request: any): Observable<ISERVICES> {
    return this.http
      .put<ISERVICES>(
        environment.API + END_POINTS.ASSIGN + END_POINTS.PUT,
        request,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'PUT')));
  }

  /*
   * ASIGNACIONES DE PERFIL-FUNCIONALIDAD
   */
  getAssignPF(): Observable<ISERVICES[]> {
    return this.http
      .get<ISERVICES[]>(
        environment.API + END_POINTS.ASSIGNPF + END_POINTS.GET,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'GET')));
  }

  createAssignPF(request: any): Observable<ISERVICES> {
    return this.http
      .post<ISERVICES>(
        environment.API + END_POINTS.ASSIGNPF + END_POINTS.POST,
        request,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'POST')));
  }
}
