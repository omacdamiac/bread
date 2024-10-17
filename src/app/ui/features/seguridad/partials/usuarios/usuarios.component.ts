import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { UTILS } from '@shared/utils/utils';
import { InputMailNsModel } from '@shared/components/input-mail/model/input.mail-ns.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  load!: boolean;
  formUser!: FormGroup;
  inputUsername = new InputNsModel.InputClass(
    'Nombre de usuario',
    'Ingresar usuario',
    true,
    'usuario',
    'text',
    true
  );
  inputCorreo = new InputMailNsModel.InputMailClass(
    'Correo electrónico',
    'Ingresar correo',
    true,
    'correo',
    true
  );
  inputNombre = new InputNsModel.InputClass(
    'Nombre completo',
    'Ingresar nombre',
    true,
    'nombre',
    'text',
    true
  );
  // inputCorreo = new InputNsModel.InputClass(
  //   'Correo',
  //   'Ingresar correo',
  //   true,
  //   'correo_usuario',
  //   'text',
  //   true
  // );
  selectPerfil = new SelectNsModel.SelectClass(
    'Asignar perfil',
    'dialogPerfil',
    false,
    '',
    []
  );
  selectRol = new SelectNsModel.SelectClass(
    'Asignar rol',
    'dialogRol',
    false,
    '',
    []
  );

  btnSaveUser = new ButtonNsModel.ButtonClass(
    'Guardar',
    'primary',
    'mx-3 my-3'
  );
  showAssign: boolean;
  btnCancel = new ButtonNsModel.ButtonClass('Cancelar', 'primary', 'mx-3 my-3');
  constructor(
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utils: UTILS,
  ) {
    this.load = false;
    this.showAssign = false;
  }

  ngOnInit(): void {
    this.createForm();
  }
  // ngAfterViewInit() {
  //   this.selectPerfil.options = this.utils.mapperSelect(this.data.perfil);
  //   this.selectRol.options = this.utils.mapperSelect(this.data.rol);
  // }
  get form() {
    return this.formUser.value;
  }
  createForm() {
    this.formUser = new FormGroup({
      estado: new FormControl(this.data?.estado === 1 ? true : false),
      // asignar: new FormControl(false),
    });
  }
  // getArrayControls() {
  //   return (<FormArray>this.formUser.get('asignacion')).controls;
  // }
  add(e: any) {
    this.showAssign = !this.showAssign;
    if (this.showAssign) {
      this.formUser.addControl('dialogRol', new FormControl());
      this.formUser.addControl('dialogPerfil', new FormControl());
    } else {
      this.formUser.removeControl('dialogRol');
      this.formUser.removeControl('dialogPerfil');
    }
    // if(e.checked) {
    //   (<FormArray>this.formUser.controls['asignacion']).push(new FormGroup({
    //     perfil: new FormControl(''),
    //     rol: new FormControl(''),
    //   }));
    // } else {
    //   (<FormArray>this.formUser.controls['asignacion']).removeAt(0);
    // }
  }
  cancel(): void {
    this.dialogRef.close(undefined);
  }

  save(): void {
    if (this.formUser.valid) {
      if (this.data) {
        let datos = {
          id_usuario: this.data.id_usuario,
        };
        this.dialogRef.close({ ...this.form, ...datos });
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
