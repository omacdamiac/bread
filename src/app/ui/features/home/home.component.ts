import { Component, OnInit } from '@angular/core';
import { AuditService, FuncionalityService } from '@data/services';
import { TEXTAPP } from '@shared/const';
import { UTILS } from '@src/app/shared/utils';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;
  subtitle: string;
  textBody: string;
  navigation: any = [];
  userSession: any = '';
  constructor(
    private auditService: AuditService,
    private funcionalityService: FuncionalityService,
    private toastrService: ToastrService,
    private utils: UTILS,
  ) {
    this.title = TEXTAPP.TITLE_HOME;
    this.subtitle = TEXTAPP.SUBTITLE_HOME;
    this.textBody = TEXTAPP.PARAGRAPH_HOME;
  }
  
  ngOnInit(): void {
    this.userSession = this.utils.getUsername();    
    this.getAccess();
  }

  getAccess() {
    this.auditService
      .getAudit(this.userSession)
      .pipe(
        switchMap((audit: any) => {
          return this.funcionalityService.getFuncionality().pipe(
            map((fun: any) => {
              console.log(fun);

              if (audit.data.length !== 0) {
                audit.data.filter((acc: any) => {
                  let funcionalidad = fun?.body?.data.filter(
                    (f: any) => acc.id_funcionalidad === f.id_funcionalidad
                  )[0];
                  // delete funcionalidad.fecha_creacion;
                  // console.log(acc);
                  console.log(funcionalidad);
                  Object.assign(acc, funcionalidad);
                });
                setTimeout(() => {
                  this.navigation = audit.data;
                }, 500);
                console.log(audit.data);
              }
            })
          );
        })
      )
      .subscribe();
  }
}
