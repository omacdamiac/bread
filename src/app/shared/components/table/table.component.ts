import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() header!: string[];
  @Input() body!: any;
  @Input() datos!: any;
  // MODAL
  @Input() modal?: any;
  @Input() headersModal?: any;
  @Input() bodyModal?: any;
  @Input() datosModal!: any;

  @Input() headersModalDos?: string[];
  @Input() bodyModalDos?: any;
  @Input() datosModalDos!: any;

  data1: any;
  data2: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog(detalle: any) {
    this.data1 = {
      header: this.headersModal,
      body: this.bodyModal,
    };
    this.data2 = {
      header: this.headersModalDos,
      body: this.bodyModalDos,
    };
    const dialogRef = this.dialog.open(this.modal, {
      width: '90%',
      height: '98vh',
      disableClose: true,
      // data: { cliente: [detalle], ...this.data },
      data: [
        { cliente: detalle },
        { deudor: this.datosModal, ...this.data1 },
        { entidad: this.datosModalDos, ...this.data2 },
      ],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
