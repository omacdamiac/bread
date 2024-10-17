import { InjectionToken } from "@angular/core";
import { ISERVICES } from "@core/models";
import { Observable } from "rxjs";

export const AUDIT_SERVICEM = new InjectionToken<AuditServiceM>(
    'audit.service'
  );
  
  export interface AuditServiceM {
    getAudit(user: string): Observable<ISERVICES>;
    createAudit(item: any): Observable<ISERVICES>
}
