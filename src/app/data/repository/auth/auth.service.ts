import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { IUSERSLOGIN } from "@core/models";

export const AUTH_SERVICEM = new InjectionToken<AuthServiceM>('auth.service');

export interface AuthServiceM {
    login(): Observable<IUSERSLOGIN[]>;
}
