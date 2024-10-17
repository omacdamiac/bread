import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { END_POINTS } from '@src/app/shared/const';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessesResolver implements Resolve<any> {
  constructor(private readonly http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const proceso = route.params.proceso;
    return this.http.get<any>(environment.API + END_POINTS.CONFIG_PROCESO + END_POINTS.PARAMETROS_BAR + proceso);
  }
}
