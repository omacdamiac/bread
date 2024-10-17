import { Component, OnInit } from '@angular/core';
import { TEXTAPP } from '@shared/const';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss'],
})
export class SeguridadComponent implements OnInit {
  title: string;
  constructor() {
    this.title = TEXTAPP.TITLE_SECURITY;
  }

  ngOnInit(): void {}
}
