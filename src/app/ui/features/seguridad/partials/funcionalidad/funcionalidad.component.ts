import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { TEXTAPP } from '@shared/const';

@Component({
  selector: 'app-funcionalidad',
  templateUrl: './funcionalidad.component.html',
  styleUrls: ['./funcionalidad.component.scss'],
})
export class FuncionalidadComponent implements OnInit {
  load: boolean;
  formFuncionalidad!: FormGroup;
  inputFuncionalidad = new InputNsModel.InputClass(
    'Nombre funcionalidad',
    'Ingresar funcionalidad',
    true,
    'funcionalidad',
    'text',
    true
  );
  inputFuncionalidadIcon = new InputNsModel.InputClass(
    'Icono',
    'Ingresar icono',
    true,
    'icono',
    'text',
    true
  );
  inputFuncionalidadLink = new InputNsModel.InputClass(
    'Link',
    'Ingresar link',
    true,
    'link',
    'text',
    true
  );
  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');
  btnCancel = new ButtonNsModel.ButtonClass('CANCELAR', 'primary', '');
  constructor(
    public dialogRef: MatDialogRef<FuncionalidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.load = false;
  }
  ngOnInit(): void {
    this.buildForm();
  }
  get form() {
    return this.formFuncionalidad.value;
  }
  private buildForm() {
    this.formFuncionalidad = new FormGroup({
      estado: new FormControl(this.data?.estado === 0 ? false : true),
    });
  }
  save(): void {
    if (this.formFuncionalidad.valid) {
      if (this.data) {
        let datos = {
          id_funcionalidad: this.data.id_funcionalidad,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formFuncionalidad.markAllAsTouched();
    }
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }
  toIcon() {
    window.open(TEXTAPP.LINK_TO_ICON, TEXTAPP.LINK_BLANK);
  }
}
