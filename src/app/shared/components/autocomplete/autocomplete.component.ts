import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ButtonNsModel } from '../button/model/button-ns.model';
import { Router } from '@angular/router';
import { IAUTOCOMPLETE } from '@core/models/vistas.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  btnIn = new ButtonNsModel.ButtonClass('Ir', 'primary', '');
  @Input() response: IAUTOCOMPLETE[] = [];
  @Input() title!: string;
  @Output() dataCurrentEvent = new EventEmitter<IAUTOCOMPLETE>();

  myControl = new FormControl();
  options!: string[];
  filteredOptions!: Observable<string[]>;
  dataCurrent!: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.setList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
      // map((value) => {
      //   console.log(value);
      //   return this._filter(value);
      // })
    );
  }

  /**
   * Seteamos la data en el stateManager
   */
  sendData(): void {
    let data = this.response.find(
      (el: IAUTOCOMPLETE) => el.proceso === this.myControl.value
      // (el: any) => console.log(el)
    );
    this.dataCurrentEvent.emit(data);
  }

  /**
   * Se llena la lista del autocomplete
   */
  private setList(): void {
    this.options = this.response.map((e: any) => e.proceso);
    // console.log(this.options);
  }

  /**
   * Se filtra los valores segun el tipeado
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // evento() {
  //   let proc = this.response.find(
  //     (el: any) => el.vista === this.myControl.value
  //   );
  //   console.log(proc);
  //   // this.router.navigate(['/' + this.link]);
  // }
}
