import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMONITORING, ISERVICES } from '@core/models';
import { END_POINTS } from '@shared/const/endPoints';
import { environment } from 'src/environments/environment';
import { MonitoringServiceM } from '../../repository';
import { TEXTAPP } from '@src/app/shared/const';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService implements MonitoringServiceM {
  constructor(private http: HttpClient) {}

  getProcessesJob(payload: any): Observable<ISERVICES> {
    return this.http
      .post<ISERVICES>(environment.API + END_POINTS.MONITORING, payload, {
        observe: 'response',
      })
      .pipe(tap((x: any) => (x.body.metodo = 'POST')));
  }
  getJobDetail(detalle: number): Observable<ISERVICES> {
    return this.http
      .get<ISERVICES>(
        environment.API +
          END_POINTS.MONITORING_DETALLE +
          END_POINTS.GET +
          TEXTAPP.TEXT_BARRA +
          detalle,
        { observe: 'response' }
      )
      .pipe(tap((x: any) => (x.body.metodo = 'GET')));
  }
}
