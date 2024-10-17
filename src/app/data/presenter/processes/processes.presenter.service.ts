import { Injectable } from '@angular/core';
import { IFILTERS } from '@core/models';
// import { IFILTERS } from '@core/models/filter.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessesPresenterService {
  listValidation: any;
  filters: Observable<any>;
  constructor() {
    this.listValidation = {
      'anio': false ,
      'mes': false,
      'tipo_documento': false,
      'numero_documento': false,
      'fecha_proceso': false,
      'fecha_range': false,
      'cuenta_contable': false,
      'descripcion': false,
      'apellido_paterno': false,
      'apellido_materno': false,
      'nombres': false,
    }
    this.filters = of(this.listValidation);
  }
  
}
