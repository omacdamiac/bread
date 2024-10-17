import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceM } from '@data/repository/auth/auth.service';
import { IUSERSLOGIN } from '@core/models';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '@shared/const';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceM {
  constructor(private http: HttpClient) {}

  login(): Observable<IUSERSLOGIN[]> {
    return this.http.get<IUSERSLOGIN[]>('http://localhost:3000' + END_POINTS.AUTH);
  }
}