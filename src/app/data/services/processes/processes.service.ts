import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISERVICES } from '@core/models';
import { END_POINTS, TEXTAPP } from '@shared/const';
import { environment } from 'src/environments/environment';
import { ProcessesServiceM } from '../../repository';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProcessesService implements ProcessesServiceM {
  constructor(private http: HttpClient) {}

  getProcesses(type: string): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(environment.API + END_POINTS.CONFIG_PROCESO + type , {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
  
  getData(id: number): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(environment.API + END_POINTS.CONFIG_PROCESO + END_POINTS.PARAMETROS_BAR + id,  {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'))
  }

  getConsult(endpoint: string, payload: any): Observable<any> {
    return this.http.post<ISERVICES>(environment.API + endpoint , payload,  {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'POST'))
  }

  getParam(parametro: string): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(environment.API + TEXTAPP.TEXT_BARRA + END_POINTS.PARAMETROS + TEXTAPP.TEXT_BARRA + parametro, {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
  // getProcess(endPoint: string): Observable<any[]> {
  //   return this.http.get<any[]>(environment.API + endPoint);
  // }
}
