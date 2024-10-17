import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() texto!: string;
  @Input() color!: string;
  @Input() class!: string;
  @Input() load!: boolean;
  @Output() evento = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  action() {
    this.evento.emit('Button');
  }
  // MÉTODO PARA LAS PRUEBAS
  processButton(): void {
    this.texto = this.texto.toUpperCase();
  }
}
