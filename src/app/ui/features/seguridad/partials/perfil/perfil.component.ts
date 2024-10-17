import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  load: boolean;
  formPerfil!: FormGroup;
  inputPerfil = new InputNsModel.InputClass(
    'Nombre perfil',
    'Ingresar nombre de perfil',
    true,
    'nombre_perfil',
    'text',
    true
  );

  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');
  btnCancel = new ButtonNsModel.ButtonClass('CANCELAR', 'primary', '');

  constructor(
    public dialogRef: MatDialogRef<PerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }
  get form() {
    return this.formPerfil.value;
  }
  private buildForm() {
    this.formPerfil = new FormGroup({
      estado: new FormControl(this.data?.estado === 0 ? false : true),
    });
  }

  save(): void {
    if (this.formPerfil.valid) {
      if (this.data) {
        let datos = {
          id_perfil: this.data.id_perfil,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formPerfil.markAllAsTouched();
    }
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
