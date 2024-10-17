import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { ProcessesService } from '@data/services';
import { StateManagerService } from '@data/presenter';
import { ToastrService } from 'ngx-toastr';
import { END_POINTS, ROUTES_APP, TEXTAPP } from '@shared/const';
import { UTILS } from '@shared/utils';
import { ISERVICES } from '@src/app/core/models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  btnIn = new ButtonNsModel.ButtonClass('Ir', 'primary', '');
  reports: any;
  title: string;
  service: ISERVICES={};
  constructor(
    private router: Router,
    private processesService: ProcessesService,
    private StateManager: StateManagerService,
    private toastrService: ToastrService,
    private utils: UTILS
  ) {
    this.title = 'Reportes';
  }
  ngOnInit(): void {
    this.setReports();
  }

  sendData(el: any) {
    if (el === undefined) {
      this.utils.showSwalAlertr(
        TEXTAPP.SELECCIONAR,
        TEXTAPP.DEBE_SELECCIONAR_REPORTE,
        false
      );
    } else {
      this.StateManager.setState(el);
      this.router.navigate([ROUTES_APP.REPORTS + ROUTES_APP.REPORT, el?.id_proceso]);
    }
  }
  private setReports(): void {
    this.processesService
      .getProcesses(END_POINTS.TYPE_REPORTS)
      .subscribe({
        next: (res: ISERVICES) => {
          this.service = res;
          let data = res?.body?.data;
          this.reports = data;
        },
        error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url),
      });
  }
  // private setReporte(): void {
  //   this.reportsService.getReports().subscribe({
  //     next: (res: any) => (this.reports = res),
  //     error: (err) => this.toastrService.info(err.message, err.statusText),
  //     complete: () => 'Listo',
  //   });
  // }
}
