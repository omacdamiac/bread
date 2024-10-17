import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { UTILS } from '@shared/utils';
import { MonitoringService } from '@data/services';
import { ISERVICES } from '@core/models';
import { EstadoM } from '@shared/const';

@Component({
  selector: 'app-secuencia',
  templateUrl: './secuencia.component.html',
  styleUrls: ['./secuencia.component.scss'],
})
export class SecuenciaComponent implements OnInit {
  load: boolean;
  eEstadoM = EstadoM;
  btnDescarga = new ButtonNsModel.ButtonClass(
    'Descargar reporte',
    'primary',
    'mx-3 my-3'
  );

  displayedColumns: string[] | undefined = [
    'secuencia_det',
    'estado',
    'resultado',
    'fecha_actualizacion',
  ];
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SecuenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private monitoringService: MonitoringService,
    private utils: UTILS,
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.getSecuencia();
    // console.log(this.data);
  }
  getSecuencia() {
    this.monitoringService.getJobDetail(this.data.secuencia).subscribe({
      next: (response: ISERVICES) => {
        let data = response?.body?.data
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 500);
      },
    })
  }
  exportTable() {
    this.utils.exportTableToExcel('TableSecuencias', 'Secuencias');
  }
}
