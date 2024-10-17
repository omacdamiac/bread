import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionalityService } from '@data/services';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { UTILS } from '@shared/utils/utils';

@Component({
  selector: 'app-subfuncionalidad',
  templateUrl: './subfuncionalidad.component.html',
  styleUrls: ['./subfuncionalidad.component.scss'],
})
export class SubfuncionalidadComponent implements OnInit {
  load: boolean;
  links: any[] = [
    { id: 'seguridad/mantenimiento', nombre: 'Mantenimiento' },
    { id: 'seguridad/asignacion', nombre: 'Asignacion de accesos' },
  ];
  formSubFuncionalidad!: FormGroup;
  inputSubFuncionalidad = new InputNsModel.InputClass(
    'Nombre subfuncionalidad',
    'Ingresar subfuncionalidad',
    true,
    'subfuncionalidad',
    'text',
    true
  );
  inputSubfuncionalidadLink = new InputNsModel.InputClass(
    'Link',
    'Ingresar link',
    true,
    'link',
    'text',
    true
  );
  selectPadreSubFuncionalidad = new SelectNsModel.SelectClass(
    'Funcionalidad padre',
    'funcionalidad',
    false,
    '',
    []
  );

  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');
  btnCancel = new ButtonNsModel.ButtonClass('CANCELAR', 'primary', '');
  constructor(
    public dialogRef: MatDialogRef<SubfuncionalidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionalityService: FuncionalityService,
    private utils: UTILS
  ) {
    this.load = false;
  }
  ngOnInit(): void {
    this.buildForm();
    this.listFuncionality();
  }
  listFuncionality() {
    this.funcionalityService.getFuncionality().subscribe({
      next: (res: any) => {
        this.selectPadreSubFuncionalidad.options = this.utils.mapperSelect(
          res.data
        );
      },
    });
  }
  get form(): AbstractControl {
    return this.formSubFuncionalidad.value;
  }
  private buildForm() {
    this.formSubFuncionalidad = new FormGroup({});
  }
  save(): void {
    if (this.formSubFuncionalidad.valid) {
      if (this.data) {
        let datos = {
          id_subfuncionalidad: this.data.id_subfuncionalidad,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formSubFuncionalidad.markAllAsTouched();
    }
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
