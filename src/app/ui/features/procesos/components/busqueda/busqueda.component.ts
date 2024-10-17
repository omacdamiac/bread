import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { ProcessesService } from '@data/services/processes/processes.service';
import { StateManagerService } from '@data/presenter';
import { IAUTOCOMPLETE } from '@core/models/vistas.model';
import { ToastrService } from 'ngx-toastr';
import { END_POINTS, ROUTES_APP, TEXTAPP } from '@shared/const';
import { UTILS } from '@shared/utils';
import { take } from 'rxjs/operators';
import { ISERVICES } from '@src/app/core/models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  btnIn = new ButtonNsModel.ButtonClass('Ir', 'primary', '');
  process!: IAUTOCOMPLETE[];
  service: ISERVICES={};
  title: string;
  constructor(
    private router: Router,
    private processesService: ProcessesService,
    private StateManager: StateManagerService,
    private toastrService: ToastrService,
    private utils: UTILS
  ) {
    this.title = 'Proceso';
  }
  ngOnInit(): void {
    this.setProcess();
  }
  sendData(el: any) {
    if (el === undefined) {
      this.utils.showSwalAlertr(
        TEXTAPP.SELECCIONAR,
        TEXTAPP.DEBE_SELECCIONAR_PROCESO,
        false
      );
      // this.toastrService.info('Debe elegir una opción', '');
    } else {
      this.StateManager.setState(el);
      this.router.navigate([ROUTES_APP.PROCESSES + ROUTES_APP.PROCESSE, el?.id_proceso]);
    }
  }
  private setProcess(): void {
    this.processesService
      .getProcesses(END_POINTS.TYPE_PROCESSES)
      .subscribe({
        next: (res: ISERVICES) => {
          console.log(res);
          
          let data = res?.body?.data;
          this.service = res;
          this.process = data;
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        // complete: () => console.log(this.service, this.router.url),
        complete: () => this.utils.createAudit(this.service, this.router.url),
      });
  }
}
