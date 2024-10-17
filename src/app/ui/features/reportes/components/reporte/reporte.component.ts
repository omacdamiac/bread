import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StateManagerService } from '@data/presenter';
import { ProcessesService } from '@data/services';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { PaginatorService } from '@shared/lang';
import { ISERVICES } from '@core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAYLOADR, ROUTES_APP } from '@shared/const';
import { map, switchMap } from 'rxjs/operators';
import { UTILS } from '@shared/utils';
import { DatosClienteComponent } from '../../partials';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {
  load: boolean;
  btnBuscar = new ButtonNsModel.ButtonClass('BUSCAR', 'primary', '');
  btnLimpiar = new ButtonNsModel.ButtonClass('LIMPIAR', 'accent', '');
  btnDescarga = new ButtonNsModel.ButtonClass(
    'Descargar reporte',
    'primary',
    'mx-3 my-3'
  );

  form!: FormGroup;
  dataProcess: any;
  data: any;
  datosReports: any;
  dataSource: any;
  filters!: any[];
  dataSend: any;
  displayedColumns!: string[] | undefined;
  headers!: string[];
  body!: string[] | undefined;
  headersModal!: string[];
  headersModalEntidad!: string[];
  bodyModalEntidad!: string[];
  bodyModal!: string[] | undefined;
  modal: any;
  modalData: any;
  parametros: any;
  service!: ISERVICES;

  listadoUnoHeaders: string[] = [];
  listadoUnoBody: string[] = [];
  listadoDosHeaders: string[] = [];
  listadoTresHeaders: string[] = [];
  // dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private paginato: PaginatorService,
    private StateManager: StateManagerService,
    private processesService: ProcessesService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UTILS
  ) {
    this.load = false;
    this.datosReports = this.StateManager.getState();
    this.modal = DatosClienteComponent;
  }

  ngOnInit(): void {    
    if (!this.datosReports.id_proceso) {
      this.notData();
      return;
    }
    // console.log(this.datosReports);
    // console.log(Object.keys(this.datosReports));
    this.createForm();
    this.getData();
    this.paginato.getPaginatorIntl();
  }
  private notData(): void {
    if (!this.datosReports || Object.keys(this.datosReports)?.length == 0) {
      this.router.navigate([ROUTES_APP.REPORTS + ROUTES_APP.BUSQUEDA]);
    }
  }
  formato!: string;
  getData(): void {
    // this.dataProcess = this.StateManager.getState();
    // let endPoint = this.dataProcess.endpoint;
    this.processesService
      .getData(this.datosReports?.id_proceso)
      .pipe(
        switchMap((res: ISERVICES) => {
          let data = res?.body?.data[0];
          this.service = res;
          // console.log(data);
          this.dataSend = data;
          this.filters = data?.filtros;
          this.formato = data.filtros.filter(
            (format: any) => format.formato
          )[0].formato;

          this.listadoUnoHeaders = data?.listadouno?.header.split('|');
          this.listadoUnoBody = data?.listadouno?.body.split('|');

          this.listadoDosHeaders = data?.listadodos?.header.split('|');
          this.listadoTresHeaders = data?.listadotres?.header.split('|');

          this.headers = data?.listadouno?.header.split('|');
          this.body = data?.listadouno?.body.split('|');
          // MODALDATA
          this.headersModal = data?.listadodos?.header.split('|');
          this.bodyModal = data?.listadodos?.body.split('|');
          this.headersModalEntidad = data?.listadotres?.header.split('|');
          this.bodyModalEntidad = data?.listadotres?.body.split('|');
          // console.log(data.filtros);

          let cmb = data?.filtros.filter((fil: any) => fil.type == 'select')[0];

          return this.processesService.getParam(cmb?.parametros).pipe(
            map((par: ISERVICES) => {
              // console.log(par);
              this.parametros = par?.body?.data;
              // cmb[0].opciones = par.data
              cmb.opciones = this.utils.mapperSelect(par?.body?.data);
              // console.log(this.filters);
            })
          );
        })
      )
      .subscribe();
    // complete: () => this.utils.createAudit(this.service, this.router.url),

    // this.processesService.getData(this.datosReports?.id_proceso).subscribe({
    //   next: (res: ISERVICES) => {
    //     // this.dataSource = new MatTableDataSource(res);
    //     let data = res.data[0];
    //     this.dataSend = data;
    //     this.filters = data.filtros;

    //     // for (var key in this.data) {
    //     //   this.displayedColumns.push(key);
    //     // }
    //     this.displayedColumns = data.listadouno.body.split('|');
    //   },
    //   error: (err) => this.toastrService.info(err.message, err.statusText),
    // });
  }
  datos: any;
  search(): void {
    // if (this.formato == 'YYYYMMDD') {
    //   this.formato = 'YYYY/MM/DD';
    // }
    // let form = this.form.value;
    // console.log(form);
    // for (let el in form) {
    //   let input: any =
    //     el.includes(PAYLOADR.fecha) || el.includes(PAYLOADR.anio)
    //       ? el
    //       : undefined;
    //   if (input) {
    //     form[input] = moment(form[input]).format(this.formato);
    //   }
    // }
    // console.log(form);
    
    if (this.form.valid) {
      // let form = this.form.value;
      // let fechaFormateada = moment(form.anio_mes).format('YYYYMM');
      // let payload = {
      //   anio_mes: fechaFormateada,
      //   tipo_documento_identidad: form.tipo_documento_identidad,
      //   documento_identidad: form.documento_identidad,
      // };
      // console.log(payload);
      // return;
      let payload = this.utils.payload(this.form.value, this.formato);
      // console.log(payload);
      this.processesService
        .getConsult(this.dataSend.endpoint, payload)
        .subscribe({
          next: (res: ISERVICES) => {
            this.service = res;
            let data = res?.body?.data;
            console.log(data);

            data.listadouno.filter(
              (reg: any) =>
                (reg.tipo_documento_identidad = this.parametros.filter(
                  (par: any) => reg.tipo_documento_identidad == par.id_parametros
                )[0].descripcion)
            );
            this.datos = data;
            console.log(this.datos);

            // .map((td: any) => {
            //   return {
            //     cuenta_contable: td.cuenta_contable,
            //     descripcion: td.descripcion_cta_contable,
            //     saldo_operativo: td.mto_total_cont_nacional,
            //     saldo_contable: td.mto_total_rcd_nacional,
            //   };
            // });
            // this.dataSource = new MatTableDataSource(data);
            // console.log(this.dataSource);

            // setTimeout(() => {
            //   this.dataSource.paginator = this.paginator;
            //   this.dataSource.sort = this.sort;
            // }, 500);
          },
          complete: () => this.utils.createAudit(this.service, this.router.url),
        });
    } else {
      this.form.markAllAsTouched();
    }
    // console.log(this.datos);
  }
  clear() {
    this.form.reset();
    this.displayedColumns = undefined;
  }
  createForm() {
    this.form = new FormGroup({});
  }
  exportTable() {
    this.utils.exportTableToExcel('TableReporte');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  trackByFn(index: number, item: any) {
    return item.id_proceso;
  }
}
