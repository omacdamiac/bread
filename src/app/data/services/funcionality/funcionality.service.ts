import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS, TEXTAPP } from '@shared/const';
import { environment } from 'src/environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  IFUNCIONALITY,
  IPROFILE,
  ISERVICES,
  ISUBFUNCIONALITY,
} from '@core/models';
import { FuncionalityServiceM } from '../../repository';

@Injectable({
  providedIn: 'root',
})
export class FuncionalityService implements FuncionalityServiceM {
  constructor(private http: HttpClient) {}

  getFuncionalityMap(): Observable<any> {
    return this.http.get(environment.API + END_POINTS.FUNCIONALITY).pipe(
      switchMap((funcionalidad: any) => {
        // console.log(res)
        return this.http.get(environment.API + END_POINTS.SUBFUNCIONALITY).pipe(
          map((subfuncionalidad: any) => {
            // console.log(res);
            // console.log(response);
            let arr = [];
            for (let funcion of funcionalidad) {
              // console.log(funcion);
              for (let subfuncion of subfuncionalidad) {
                // item.child = [];
                if (subfuncion.id_padre === funcion.id) {
                  // console.log(subfuncion);
                  arr.push(subfuncion);
                }
              }
            }
            console.log(arr);
            console.log(arr);
          })
        );
      })
    );
  }

  // FUNCIONALIDADES
  getFuncionality(): Observable<ISERVICES> {
    return this.http
      .get<ISERVICES>(
        environment.API + END_POINTS.FUNCIONALITY + END_POINTS.GET,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'GET')));
  }
  createFuncionality(request: IFUNCIONALITY): Observable<ISERVICES> {
    return this.http
      .post<ISERVICES>(
        environment.API + END_POINTS.FUNCIONALITY + END_POINTS.POST,
        request,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'POST')));
  }
  editFuncionality(body: IFUNCIONALITY): Observable<ISERVICES> {
    return this.http
      .put<ISERVICES>(
        environment.API + END_POINTS.FUNCIONALITY + END_POINTS.PUT,
        body,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'PUT')));
  }
  // deleteFuncionality(id: number): Observable<IFUNCIONALITY> {
  //   return this.http.delete<IFUNCIONALITY>(
  //     environment.API + END_POINTS.FUNCIONALITY + TEXTAPP.TEXT_BARRA + id
  //   );
  // }

  // SUBFUNCIONALIDADES
  getSubFuncionality(): Observable<ISERVICES> {
    return this.http
      .get<ISERVICES>(
        environment.API + END_POINTS.SUBFUNCIONALITY + END_POINTS.GET,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'GET')));
  }
  createSubFuncionality(request: ISUBFUNCIONALITY): Observable<ISERVICES> {
    return this.http
      .post<ISERVICES>(
        environment.API + END_POINTS.SUBFUNCIONALITY + END_POINTS.POST,
        request,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'POST')));
  }
  editSubFuncionality(body: ISUBFUNCIONALITY): Observable<ISERVICES> {
    return this.http
      .put<ISERVICES>(
        environment.API + END_POINTS.SUBFUNCIONALITY + END_POINTS.PUT,
        body,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'PUT')));
  }
  // deleteSubFuncionality(id: number): Observable<ISUBFUNCIONALITY> {
  //   return this.http.delete<ISUBFUNCIONALITY>(
  //     environment.API + END_POINTS.SUBFUNCIONALITY + TEXTAPP.TEXT_BARRA + id
  //   );
  // }
}
