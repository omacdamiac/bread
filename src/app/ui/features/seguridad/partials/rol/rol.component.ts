import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {
  load: boolean;
  formRol!: FormGroup;
  inputRol = new InputNsModel.InputClass(
    'Nombre rol',
    'Ingresar rol',
    true,
    'nombre_rol',
    'text',
    true
  );

  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');
  btnCancel = new ButtonNsModel.ButtonClass('CANCELAR', 'primary', '');

  constructor(
    public dialogRef: MatDialogRef<RolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }
  private buildForm() {
    this.formRol = new FormGroup({
      estado: new FormControl(this.data?.estado === 0 ? false : true),
    });
  }
  get form() {
    return this.formRol.value;
  }
  save(): void {
    if (this.formRol.valid) {
      if (this.data) {
        let datos = {
          id_rol: this.data.id_rol,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formRol.markAllAsTouched();
    }
  }
}
