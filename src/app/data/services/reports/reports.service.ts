import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISERVICES } from '@core/models';
import { END_POINTS } from '@shared/const';
import { environment } from 'src/environments/environment';
import { ReportsServiceM } from '../../repository';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportsService implements ReportsServiceM {
  constructor(private http: HttpClient) {}

  getReports(): Observable<ISERVICES[]> {
    return this.http.get<ISERVICES[]>(environment.API + END_POINTS.REPORTS + END_POINTS.GET, {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }

  getReport(endPoint: string): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(environment.API + endPoint, {observe: "response"}).pipe(tap( (x: any) => x.body.metodo = 'GET'));
  }
}
