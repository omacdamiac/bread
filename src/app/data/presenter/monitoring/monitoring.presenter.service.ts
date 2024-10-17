import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonitoringPresenterService {
  listadoEstado: any;
  constructor() {
    this.listadoEstado = [
      { nombre: 'En espera', id: 0 },
      { nombre: 'Exitoso', id: 1 },
      { nombre: 'Fallido', id: 2 },
      { nombre: 'En ejecución', id: 3 }
    ];
  }
}
// 0= En espera, 1= Exitoso, 2= Fallido, 3= En ejecución