import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor(private paginato: MatPaginatorIntl) {}

  getPaginatorIntl() {
    this.paginato.itemsPerPageLabel = 'Items por página';
    this.paginato.nextPageLabel = 'Página siguiente ';
    this.paginato.previousPageLabel = 'Página anterior';
    this.paginato.firstPageLabel = 'Primera página';
    this.paginato.lastPageLabel = 'Última página';
  }
}
