import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
})
export class ProcesosComponent implements OnInit {
  title: string;
  constructor() {
    this.title = 'Procesos';
  }

  ngOnInit(): void {}


}
