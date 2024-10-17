import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {
  ProcessesPresenterService,
  StateManagerService,
} from '@data/presenter';
import { ProcessesService } from '@data/services';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { PaginatorService } from '@shared/lang';
import { ROUTES_APP } from '@shared/const';
import { Router } from '@angular/router';
import { ISERVICES } from '@core/models';
import { UTILS } from '@shared/utils';
import { DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { DatosClienteComponent } from '../../../reportes/partials';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
  providers: [DatePipe],
})
export class ProcesoComponent implements OnInit {
  load: boolean;
  btnBuscar = new ButtonNsModel.ButtonClass('BUSCAR', 'primary', '');
  btnLimpiar = new ButtonNsModel.ButtonClass('LIMPIAR', 'accent', '');
  btnDescarga = new ButtonNsModel.ButtonClass(
    'Descargar reporte',
    'primary',
    'mx-3 my-3'
  );
  validation: any;
  form!: FormGroup;
  datosProcess: any;
  dataSource: any;
  displayedColumns!: string[] | undefined;
  headers!: string[];
  body!: string[] | undefined;
  filters!: any[];
  dataSend: any;
  service!: ISERVICES;
  parametros: any;
  modal: any;

  headersModal!: string[];
  headersModalEntidad!: string[];
  bodyModalEntidad!: string[];
  bodyModal!: string[] | undefined;

  listadoUnoHeaders: string[] = [];
  listadoUnoBody: string[] = [];
  listadoDosHeaders: string[] = [];
  listadoDosBody: string[] = [];
  listadoTresHeaders: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private StateManager: StateManagerService,
    private processesService: ProcessesService,
    private toastrService: ToastrService,
    private router: Router,
    private paginato: PaginatorService,
    private utils: UTILS,
    private datePipe: DatePipe
  ) {
    this.load = false;
    this.datosProcess = this.StateManager.getState();
    this.modal = DatosClienteComponent;
  }

  ngOnInit(): void {
    if (!this.datosProcess.id_proceso) {
      this.notData();
      return;
    }
    console.log(this.datosProcess);
    // console.log(Object.keys(this.datosProcess));
    // this.getPresenter();
    this.createForm();
    this.getData();
    this.paginato.getPaginatorIntl();
  }
  private notData(): void {
    if (!this.datosProcess || Object.keys(this.datosProcess)?.length == 0) {
      this.router.navigate([ROUTES_APP.PROCESSES + ROUTES_APP.BUSQUEDA]);
    }
  }
  formato!: string;
  private getDataOLD(): void {
    this.processesService.getData(this.datosProcess?.id_proceso).subscribe({
      next: (res: ISERVICES) => {
        let data = res?.body?.data[0];
        this.service = res;
        console.log(res);
        this.dataSend = data;
        this.filters = data?.filtros;
        this.formato = data.filtros.filter(
          (format: any) => format.formato
        )[0].formato;
        //vthis.setFilters(data.filtros);
        // data.filtros
        //   .map((filtro: any) => filtro.model)
        //   .filter((f: any) => {
        //     console.log(f);
        //     Object.entries(this.validation).forEach(([key, value]) => {
        //       console.log(value);

        //       if (f === key) {
        //         this.validation[f] = true;
        //       }
        //     });
        //   });
        // console.log(this.validation);
        // this.displayedColumns = data?.listadouno?.header.split('|');
        this.headers = data?.listadouno?.header.split('|');
        this.body = data?.listadouno?.body.split('|');
        let cmb = data?.filtros.filter((fil: any) => fil.type == 'select')[0];
        console.log(cmb);

        this.processesService.getParam(cmb?.parametros).pipe(
          map((par: ISERVICES) => {
            console.log(par);
            this.parametros = par?.body?.data;
            // cmb[0].opciones = par.data
            cmb.opciones = this.utils.mapperSelect(par?.body?.data);
            // console.log(this.filters);
          })
        );
      },
      // complete: () => this.utils.createAudit(this.service, this.router.url),

      // complete: ()=>{
      //   console.log(this.processesService);

      //   this.utils.createAudit(this.router.url
      //     )}
    });
  }
  getData(): void {
    // this.dataProcess = this.StateManager.getState();
    // let endPoint = this.dataProcess.endpoint;
    this.processesService
      .getData(this.datosProcess?.id_proceso)
      .pipe(
        switchMap((res: ISERVICES) => {
          let data = res?.body?.data[0];
          this.service = res;
          console.log(data);
          this.dataSend = data;
          this.filters = data?.filtros;
          this.formato = data.filtros.filter(
            (format: any) => format.formato
          )[0].formato;

          this.listadoUnoHeaders = data?.listadouno?.header.split('|');
          this.listadoUnoBody = data?.listadouno?.body.split('|');

          this.listadoDosHeaders = data?.listadodos?.header.split('|');
          this.listadoDosBody = data?.listadodos?.body.split('|');

          // this.headers = data?.listadouno?.header.split('|');
          // this.body = data?.listadouno?.body.split('|');
          // MODALDATA
          // this.headersModal = data?.listadodos?.header.split('|');
          // this.bodyModal = data?.listadodos?.body.split('|');
          this.headersModalEntidad = data?.listadotres?.header.split('|');
          this.bodyModalEntidad = data?.listadotres?.body.split('|');
          // console.log(data.filtros);

          let cmb = data?.filtros.filter((fil: any) => fil.type == 'select')[0];
          console.log(cmb);

          if(cmb) {
            return this.processesService.getParam(cmb?.parametros).pipe(
              map((par: ISERVICES) => {
                this.parametros = par?.body?.data;
                // cmb[0].opciones = par.data
                cmb.opciones = this.utils.mapperSelect(par?.body?.data);
                // console.log(this.filters);
              })
            );

          } else {
            return []
          }
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
    if (this.form.valid) {
      // let form = this.form.value;
      // let fecha = this.datePipe.transform(
      //   this.form.value.fecha_proceso,
      //   'yyyy/MM/dd'
      // );

      // let payload = {
      //   fecha_proceso: fecha,
      //   cuenta_contable: form.cuenta_contable,
      //   descripcion_cta_contable: form.descripcion,
      // };
      let payload = this.utils.payload(this.form.value, this.formato);
      console.log(payload);
      // return;
      this.processesService.getConsult(this.dataSend.endpoint, payload).subscribe({
        next: (res: ISERVICES) => {
          let data = res?.body?.data;
          console.log(data);
          this.service = res;
          this.datos = data;
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  searchOLD(): void {
    if (this.form.valid) {
      let form = this.form.value;
      let fecha = this.utils.formatFecha(form.fecha_proceso);
      console.log(form.descripcion);
      let myCondition = '';

      if (fecha && form.cuenta_contable != null) {
        myCondition =
          "fecha_proceso ='" +
          fecha +
          "'" +
          " and cuenta_contable::text like '%" +
          form.cuenta_contable +
          "%'";
      }
      if (fecha && form.descripcion != null) {
        myCondition =
          "fecha_proceso ='" +
          fecha +
          "'" +
          " and descripcion_cta_contable like '%" +
          form.descripcion +
          "%'";
      }

      if (fecha && form.cuenta_contable != null && form.descripcion != null) {
        myCondition =
          "fecha_proceso ='" +
          fecha +
          "'" +
          " and ((cuenta_contable::text like '%" +
          form.cuenta_contable +
          "%') and (descripcion_cta_contable like '%" +
          form.descripcion +
          "%'))";
      }
      if (fecha && form.cuenta_contable == null && form.descripcion == null) {
        myCondition = "fecha_proceso ='" + fecha + "'";
      }
      console.log(myCondition);

      let payload = {
        tabla: this.dataSend.tabla,
        campos: this.dataSend.campos,
        // condicion: "fecha_proceso ='" + fecha + "'" ,
        condicion: myCondition,
        // condicion:`fecha_proceso =${form.fecha_proceso} and ((tpc.cuenta_contable = ${form.cuentaContable} or 0 =0) or (tpc.descripcion_cta_contable  = ${form.descripcion} or '' =''))`
      };
      console.log(payload);
      // return;
      this.processesService.getConsult('', payload).subscribe({
        next: (res: ISERVICES) => {
          let data = res?.body?.data;
          console.log(res);
          this.service = res;
          this.datos = data;

          // let tabla = data.map((td: any) => {
          //   return {
          //     cuenta_contable: td.cuenta_contable,
          //     descripcion: td.descripcion_cta_contable,
          //     saldo_operativo: td.mto_total_cont_nacional,
          //     saldo_contable: td.mto_total_rcd_nacional,
          //   };
          // });

          // this.dataSource = new MatTableDataSource(tabla);
          // setTimeout(() => {
          //   this.dataSource.paginator = this.paginator;
          //   this.dataSource.sort = this.sort;
          // }, 500);
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        // complete: () => this.utils.createAudit(this.service, this.router.url),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  clear() {
    this.form.reset();
    this.displayedColumns = undefined;
  }
  createForm() {
    this.form = new FormGroup({});
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
  exportTable() {
    console.log('A EXCEL');
    this.utils.exportTableToExcel('TableProceso', this.datosProcess?.proceso);
  }
  test() {
    if (this.form.valid) {
      console.log(this.form.value);
      let form = this.form.value;

      let send = `fecha_proceso =${form.fecha_proceso} and ((tpc.cuenta_contable = ${form.cuentaContable} or 0 =0) or (tpc.descripcion_cta_contable  = ${form.descripcion} or '' =''))`;
      console.log(send);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
