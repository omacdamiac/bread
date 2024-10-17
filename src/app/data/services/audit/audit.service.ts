import { Injectable } from '@angular/core';
import { ISERVICES } from '@core/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { END_POINTS, TEXTAPP } from '@shared/const';
import { AuditServiceM } from '../../repository';

@Injectable({
  providedIn: 'root',
})
export class AuditService implements AuditServiceM {
  constructor(private http: HttpClient) {}

  getAudit(user: string): Observable<ISERVICES> {
    return this.http.get<ISERVICES>(
      environment.API + END_POINTS.AUDIT + END_POINTS.CONSULT_USER + TEXTAPP.TEXT_BARRA + user
    );
  }
  createAudit(item: any): Observable<ISERVICES> {
    return this.http.post<ISERVICES>(
      environment.API + END_POINTS.AUDIT + END_POINTS.POST,
      item
    );
  }
}
