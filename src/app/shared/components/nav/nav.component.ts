import { Component, Input, OnInit } from '@angular/core';
import { iMAIN } from '@core/models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() hide: boolean;
  @Input() main!: iMAIN[];
  constructor() {
    this.hide = true;
  }

  ngOnInit(): void {}

  setFuncionalidad(e: any) {
    let currentFunc = localStorage.getItem('funcionalidad');
    if (currentFunc) {
      localStorage.removeItem('funcionalidad');
      localStorage.setItem('funcionalidad', e);
    } else {
      localStorage.setItem('funcionalidad', e);
    }
  }
}
