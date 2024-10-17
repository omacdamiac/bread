import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMONITORING, ISERVICES } from '@core/models';
import { MonitoringService } from '@data/services';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { EstadoM } from '@shared/const/state.enum';
import { PaginatorService } from '@shared/lang';
import { UTILS } from '@shared/utils/utils';
import { MonitoringPresenterService } from '@data/presenter';
import { DatePickerNsModel } from '@shared/components/datepicker/model/datepicker-ns.model';
import { SecuenciaComponent } from './partial/secuencia/secuencia.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss'],
})
export class MonitoreoComponent implements OnInit, AfterViewInit {
  load: boolean;
  eEstadoM = EstadoM;
  fechaProceso = new DatePickerNsModel.DatePickerClass(
    'Fecha proceso',
    'Ingrese fecha',
    true,
    'fecha_proceso'
  );
  inputProceso = new InputNsModel.InputClass(
    'Proceso',
    'Ingresar proceso',
    false,
    'proceso',
    'text',
    true
  );
  selectEstado = new SelectNsModel.SelectClass(
    'Estado',
    'estado',
    false,
    '',
    []
  );
  btnBuscar = new ButtonNsModel.ButtonClass('BUSCAR', 'primary', '');
  btnLimpiar = new ButtonNsModel.ButtonClass('LIMPIAR', 'accent', '');
  btnDescarga = new ButtonNsModel.ButtonClass(
    'Descargar reporte',
    'primary',
    'mx-3 my-3'
  );
  title: string = 'Monitoreo';
  form!: FormGroup;
  // displayedColumns!: string[] | undefined;
  displayedColumns: string[] | undefined = [
    'secuencia',
    'nombre_proceso',
    'origen',
    'fecha_proceso',
    'fecha_inicio',
    'fecha_fin',
    'tiempo_ejecucion',
    'estado',
    'acciones',
  ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource!: any;
  service: ISERVICES = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private paginato: PaginatorService,
    private monitoringService: MonitoringService,
    private monitoringPresenter: MonitoringPresenterService,
    private toastrService: ToastrService,
    private router: Router,
    private utils: UTILS
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.createForm();
    this.getListPresenter();
    this.paginato.getPaginatorIntl();
  }
  private getData(req: any): void {
    this.monitoringService.getProcessesJob(req).subscribe({
      next: (res: ISERVICES) => {
        this.service = res;
        let data = res?.body?.data;
        console.log(res);
        console.log(data);
        if (data) {
          // this.displayedColumns = this.utils.setListHeader([data]);
          this.dataSource = new MatTableDataSource(data);
          // console.log(this.displayedColumns);
          console.log(this.dataSource);
        } else {
          this.utils.showSwalAlertr(
            'Monitoreo',
            'No se encontro registros para la búsqueda',
            false
          );
        }
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => {
        this.utils.createAudit(this.service,this.router.url);
      },
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 500);
  }
  createForm() {
    this.form = new FormGroup({});
  }
  getListPresenter() {
    this.selectEstado.options = this.monitoringPresenter.listadoEstado;
  }
  openDialog(e: any) {
    console.log(e);
    const dialogRef = this.dialog.open(SecuenciaComponent, {
      width: '80%',
      height: 'auto',
      disableClose: true,
      data: e,
      // data: e ? e : undefined,
    });
  }
  reload(e: any) {
    console.log(e);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search() {
    if (this.form.valid) {
      let fecha = this.utils.mapperDate(this.form.value.fecha_proceso);
      console.log(this.form.value);

      let payload = {
        estado: this.form.value.estado,
        fecha_proceso: fecha,
        nombre_proceso: this.form.value.proceso,
      };
      console.log(payload);
      this.getData(payload);
    } else {
      this.form.markAllAsTouched();
    }
  }
  exportTable() {
    this.utils.exportTableToExcel('TableMonitoreo', 'Monitoreo');
  }
  clear() {
    this.form.reset();
    this.dataSource = [];
    // this.displayedColumns = undefined;
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
}
