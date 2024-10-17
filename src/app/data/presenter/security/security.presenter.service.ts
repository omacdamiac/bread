import { Injectable } from '@angular/core';
import { IDATA } from '@core/models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityPresenterService {
  permisos: IDATA[];
  permisos$: any;
  constructor() {
    this.permisos = [
      {
        data: [
          {
            id_permiso: 1,
            nombre_permiso: 'Lectura',
            estado: 0,
          },
          {
            id_permiso: 2,
            nombre_permiso: 'Escritura',
            estado: 0,
          },
          {
            id_permiso: 3,
            nombre_permiso: 'Actualización',
            estado: 0,
          },
          {
            id_permiso: 4,
            nombre_permiso: 'Eliminación',
            estado: 0,
          },
          {
            id_permiso: 5,
            nombre_permiso: 'Ejecución',
            estado: 0,
          },
        ],
        message: 'perfiles cargados exitosamente',
        status: 1,
      },
    ];
  }

  get serviceSP() {
    return (this.permisos$ = of(this.permisos));
  }
}
