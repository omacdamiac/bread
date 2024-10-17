import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {
  load: boolean;
  formPermisos!: FormGroup;
  inputPermisos = new InputNsModel.InputClass(
    'Nombre perfil',
    'Ingresar nombre de permiso',
    true,
    'nombre_permiso',
    'text',
    true
  );

  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');
  btnCancel = new ButtonNsModel.ButtonClass('CANCELAR', 'primary', '');

  constructor(
    public dialogRef: MatDialogRef<PermisosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.load = false;
  }
  ngOnInit(): void {
    this.buildForm();
  }
  get form() {
    return this.formPermisos.value;
  }

  private buildForm() {
    this.formPermisos = new FormGroup({
      estado: new FormControl(this.data?.estado === 0 ? false : true),
    });
  }
  save(): void {
    if (this.formPermisos.valid) {
      if (this.data) {
        let datos = {
          id_permiso: this.data.id_permiso,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formPermisos.markAllAsTouched();
    }
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
