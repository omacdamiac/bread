import { MatPaginatorIntl } from '@angular/material/paginator';
import {
  IFUNCIONALITY,
  IPROFILE,
  IROL,
  ISELECT,
  ISUBFUNCIONALITY,
  IUSERS,
} from '@core/models';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { PAYLOADR, TEXTAPP } from '../const';
import * as XLSX from 'xlsx';
import { AuditService } from '@data/services';
import * as moment from 'moment';

const getFileName = (name: string | undefined) => {
  let timeSpan = new Date().toLocaleDateString();
  let sheetName = name?.replace(/ /g, '') || 'ExportResult';
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName,
  };
};
@Injectable({ providedIn: 'root' })
export class UTILS {
  constructor(
    public paginato: MatPaginatorIntl,
    private auditService: AuditService
  ) {}
  
  payload(form: any, formato: string) {
    if (formato == 'YYYYMMDD') {
      formato = 'YYYY/MM/DD';
    }
    // let form = this.form.value;
    // console.log(form);
    for (let el in form) {
      let input: any =
        el.includes(PAYLOADR.fecha) || el.includes(PAYLOADR.anio)
          ? el
          : undefined;
      if (input) {
        form[input] = moment(form[input]).format(formato);
      }
    }
    return form;
  }

  formatFecha(e: any) {
    // console.log(e);
    let anio = e.getFullYear();
    let mes = e.getMonth() + 1;
    let dia = e.getDate();
    return anio + '-' + mes + '-' + dia;
  }

  exportTableToExcel(tableId: string, name?: string) {
    let { sheetName, fileName } = getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName,
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  mapperDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return (
      String(day).padStart(2, '0') +
      '/' +
      String(month + 1).padStart(2, '0') +
      '/' +
      year
    );
  }

  getPaginatorIntl() {
    let paginato = new MatPaginatorIntl();
    paginato.itemsPerPageLabel = 'Items por página';
    paginato.nextPageLabel = 'Página siguiente ';
    paginato.previousPageLabel = 'Página anterior';
    paginato.firstPageLabel = 'Primera página';
    paginato.lastPageLabel = 'Última página';
  }
  getDutchPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Items per pagina:';
    paginatorIntl.nextPageLabel = 'Volgende pagina';
    paginatorIntl.previousPageLabel = 'Vorige pagina';
    // paginatorIntl.getRangeLabel = dutchRangeLabel;
    return paginatorIntl;
  }
  mapperUserList(data: any) {
    let arr = [];
    for (let i of data) {
      let item = {
        id: i.nombre_funcionalidad,
        nombre: false,
        correo: 'primary',
      };
      arr.push(item);
    }
    return arr;
  }
  deleteFun(element: IFUNCIONALITY) {
    return {
      id_funcionalidad: element.id_funcionalidad,
      nombre_funcionalidad: element.nombre_funcionalidad,
      link: element.link,
      icono: element.icono,
      fecha_creacion: new Date().toUTCString(),
      estado: 2,
    };
  }
  deleteSubFun(element: ISUBFUNCIONALITY) {
    return {
      id_subfuncionalidad: element.id_subfuncionalidad,
      id_funcionalidad: Number(element.id_funcionalidad),
      nombre_subfuncionalidad: element.nombre_subfuncionalidad,
      link: element.link,
      icono: '',
      fecha_creacion: new Date(),
      estado: 2,
    };
  }
  deleteprofile(element: IPROFILE) {
    return {
      id_perfil: element.id_perfil,
      fecha_creacion: new Date(),
      nombre_perfil: element.nombre_perfil,
      estado: 2,
    };
  }
  deleteRole(element: IROL) {
    return {
      id_rol: element.id_rol,
      fecha_creacion: new Date(),
      nombre_rol: element.nombre_rol,
      estado: 2,
    };
  }
  deleteUser(element: IUSERS) {
    return {
      estado: 2,
      correo: element.correo,
      fecha_creacion: new Date(),
      nombre: element.nombre,
      usuario: element.usuario,
      id_usuario: element.id_usuario,
    };
  }
  deleteRelationUser(element: any) {
    return {
      estado: 2,
      fecha_creacion: new Date(),
      id_asigaccesos: element.id_asigaccesos,
      id_asigperfiles: Number(element.id_asigperfiles),
      id_asigroles: Number(element.id_asigroles),
      id_usuario: element.id_usuario,
    };
  }
  setListHeader(items: any): string[] {
    let displayedColumns: string[] = [];
    for (var key in items[0]) {
      displayedColumns.push(key);
    }
    return displayedColumns;
  }
  // VALIDATIONREPEAT FUNCIONALITY
  validateNamefunctionality(e: IFUNCIONALITY, list: IFUNCIONALITY[]) {
    if (list) {
      return list.filter(
        (f: IFUNCIONALITY) => f.nombre_funcionalidad === e.nombre_funcionalidad
      );
    } else {
      return [];
    }
  }
  // VALIDATIONREPEAT SUBFUNCIONALITY
  validateNameSubfunctionality(e: ISUBFUNCIONALITY, list: ISUBFUNCIONALITY[]) {
    if (list) {
      return list.filter(
        (f: ISUBFUNCIONALITY) =>
          f.nombre_subfuncionalidad === e.nombre_subfuncionalidad
      );
    } else {
      return [];
    }
  }
  // VALIDATIONREPEAT PROFILE
  validateNameProfile(e: IPROFILE, list: IPROFILE[]) {
    if (list) {
      return list.filter((f: IPROFILE) => f.nombre_perfil === e.nombre_perfil);
    } else {
      return [];
    }
  }
  // VALIDATIONREPEAT ROLE
  validateNameRole(e: IROL, list: IROL[]) {
    if (list) {
      return list.filter((f: IROL) => f.nombre_rol === e.nombre_rol);
    } else {
      return [];
    }
  }
  // CREATE | EDIT FUNCIONLITY
  mapperNewfunctionality(element: any): IFUNCIONALITY {
    if (element.id_funcionalidad) {
      return {
        id_funcionalidad: element.id_funcionalidad,
        nombre_funcionalidad: element.funcionalidad,
        link: element.link,
        icono: element.icono,
        fecha_creacion: new Date().toUTCString(),
        estado: 1,
      };
    } else {
      return {
        nombre_funcionalidad: element.funcionalidad,
        link: element.link,
        icono: element.icono,
        fecha_creacion: new Date(),
        estado: 1,
      };
    }
  }
  // CREATE | EDIT SUBFUNCIONLITY
  mapperNewSubfunctionality(element: any): ISUBFUNCIONALITY {
    if (element.id_subfuncionalidad) {
      return {
        id_subfuncionalidad: element.id_subfuncionalidad,
        id_funcionalidad: Number(element.funcionalidad),
        nombre_subfuncionalidad: element.subfuncionalidad,
        link: element.link,
        icono: '',
        fecha_creacion: new Date(),
        estado: 1,
      };
    } else {
      return {
        id_funcionalidad: Number(element.funcionalidad),
        nombre_subfuncionalidad: element.subfuncionalidad,
        link: element.link,
        icono: '',
        fecha_creacion: new Date(),
        estado: 1,
      };
    }
  }
  // CREATE | EDIT USERS
  mapperUser(element: any): IUSERS {
    if (element.id_usuario) {
      return {
        estado: element.estado ? 1 : 0,
        correo: element.correo,
        fecha_creacion: new Date(),
        nombre: element.nombre,
        usuario: element.usuario,
        id_usuario: element.id_usuario,
      };
    } else {
      return {
        estado: 1,
        correo: element.correo,
        fecha_creacion: new Date(),
        nombre: element.nombre,
        usuario: element.usuario,
      };
    }
  }
  mapperProfile(element: any): IPROFILE {
    if (element.id_perfil) {
      return {
        id_perfil: element.id_perfil,
        fecha_creacion: new Date(),
        nombre_perfil: element.nombre_perfil,
        estado: element.estado ? 1 : 0,
      };
    } else {
      return {
        fecha_creacion: new Date(),
        nombre_perfil: element.nombre_perfil,
        estado: element.estado ? 1 : 0,
      };
    }
  }
  mapperPermission(element: any) {
    let obj;
    if (element.id_permiso) {
      obj = {
        id: element.id,
        fecha_creacion: new Date(),
        nombre_permiso: element.nombre_permiso,
        estado: element.estado ? 1 : 0,
      };
    } else {
      obj = {
        fecha_creacion: new Date(),
        nombre_permiso: element.nombre_permiso,
        estado: element.estado ? 1 : 0,
      };
    }
    return obj;
  }
  mapperRole(element: any): IROL {
    if (element) {
      return {
        id_rol: element.id_rol,
        fecha_creacion: new Date(),
        nombre_rol: element.nombre_rol,
        estado: element.estado ? 1 : 0,
      };
    } else {
      return {
        fecha_creacion: new Date(),
        nombre_rol: element.nombre_rol,
        estado: element.estado ? 1 : 0,
      };
    }
  }
  mapperPermissionCHK(element: any): any {
    let arr = [];
    for (let i of element) {
      let item = {
        id_permiso: i.id_permiso,
        nombre_permiso: i.nombre_permiso,
        checked: false,
        // estado: false,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperFuncionalityCHK(element: any): any {
    let arr = [];
    for (let i of element) {
      let item = {
        id_funcionalidad: i.id_funcionalidad,
        nombre_funcionalidad: i.nombre_funcionalidad,
        // estado: i.estado == 1 ? true : false,
        checked: false,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperFuncionalityCHKRelation(element: any, chks: any): any {
    let arr = [];
    for (let ch of chks) {
      for (let i of element) {
        let item = {
          id_funcionalidad: i.id_funcionalidad,
          // nombre_funcionalidad: i.nombre_funcionalidad,
          // estado: i.estado == 1 ? true : false,
          checked: ch.id_funcionalidad === i.id_funcionalidad,
        };
        arr.push(item);
      }
    }
    return arr;
  }
  mapperCreateRelationRP(list: any, element: any): any {
    let chks = element.filter((el: any) => el.checked === true);

    let arr = [];

    for (let rel of [list]) {
      for (let chk of chks) {
        let item = {
          // id_asigroles: this.generateGUID(),
          // id: this.generateGUID(),
          id_rol: rel.id_rol,
          id_permiso: chk.id_permiso,
          fecha_creacion: new Date(),
          estado: 1,
        };
        arr.push(item);
      }
    }
    return arr;
  }
  mapperCreateRelationPF(list: any, element: any): any {
    let chks = element.filter((el: any) => el.checked === true);
    let arr = [];

    for (let per of [list]) {
      for (let chk of chks) {
        let item = {
          // id_asigroles: this.generateGUID(),
          // id: this.generateGUID(),
          id_perfiles: per.id_perfil,
          id_funcionalidad: chk.id_funcionalidad,
          fecha_creacion: new Date(),
          estado: 1,
        };
        arr.push(item);
      }
    }
    return arr;
  }
  mapperNewEditedRelationRP(list: any, rol: any): any {
    let arr = [];
    for (let per of list) {
      let item = {
        estado: 1,
        fecha_creacion: new Date(),
        id_permiso: per.id_permiso,
        id_rol: rol.id_rol,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperEditEditedRelationRP(list: any, rol: any): any {
    let arr = [];
    for (let per of list) {
      let item = {
        id_asigroles: per.id_asigroles,
        estado: 2,
        fecha_creacion: new Date(),
        id_permiso: per.id_funcionalidad,
        id_rol: rol.id_rol,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperNewEditedRelationPF(list: any, perfil: any): any {
    let arr = [];
    for (let per of list) {
      let item = {
        estado: 1,
        fecha_creacion: new Date(),
        id_funcionalidad: per.id_funcionalidad,
        id_perfiles: perfil.id_perfil,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperEditEditedRelationPF(list: any, perfil: any): any {
    let arr = [];
    for (let per of list) {
      let item = {
        id_asigperfiles: per.id_asigperfiles,
        estado: 2,
        fecha_creacion: new Date().toUTCString(),
        id_funcionalidad: per.id_funcionalidad,
        id_perfiles: perfil.id_perfil,
      };
      arr.push(item);
    }
    return arr;
  }
  mapperRelationUsers(element: any): any {
    return {
      // estado: element.estado,
      fecha_creacion: new Date(),
      id_asigperfiles: Number(element.perfil),
      id_asigroles: Number(element.rol),
      id_usuario: element.id_usuario,
      estado: element.estado ? 1 : 0,
    };
  }

  mapperRelationEditarUser(
    element: any,
    id: number,
    rol: number,
    perfil: number
  ): any {
    return {
      id_asigaccesos: id,
      fecha_creacion: new Date(),
      id_asigperfiles: Number(perfil),
      id_asigroles: Number(rol),
      id_usuario: element.id_usuario,
      estado: 1,
    };
  }

  mapperfunctionalityOLD(element: any): any {
    let arr = [];
    for (let i of element) {
      let item = {
        name: i.nombre_funcionalidad,
        completed: false,
        color: 'primary',
      };
      arr.push(item);
    }
    return arr;
  }

  mapperSelect(data: any[]): ISELECT[] {
    let arr = [];
    for (let i of data) {
      let item = {
        nombre:
          i.nombre_perfil ||
          i.nombre_rol ||
          i.nombre_funcionalidad ||
          i.descripcion,
        id: i.id_perfil || i.id_rol || i.id_funcionalidad || i.id_parametros,
      };
      arr.push(item);
    }
    return arr;
  }

  ObjectUpdatePerfil(): any {
    // UPDATE
    return {
      fecha_creacion: 'Sun, 01 Jam 2023 00:00:00 GMT',
      nombre_perfil: 'Contabilidad',
      estado: 1,
      id_perfil: 1,
    };
  }
  generateGUID(): number {
    return Math.floor(Math.random() * 999999);
  }

  showSwalAlertr(title: string, message: string, btnhow: boolean) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      showCancelButton: true,
      cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
      confirmButtonColor: TEXTAPP.COLOR_BUTTON,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showConfirmButton: btnhow,
      showCloseButton: true,
    }).then((result): any => {
      if (result.isConfirmed) {
      }
    });
  }

  ////// AUDITORIA

  getFuncionality() {
    return localStorage.getItem('funcionalidad');
  }
  getUsername() {
    return localStorage.getItem('username');
  }
  private setApiRoute(api: string): string {
    return api.replace('http://localhost:8005/api', '');
  }

  createAudit(item: any, ruta: string) {
    // console.log(item);
    let payload = {
      usuario: this.getUsername(),
      endpoint: ruta,
      api: this.setApiRoute(item.url),
      metodo: item.body.metodo,
      id_funcionalidad: Number(this.getFuncionality()),
    };
    // console.log(payload);
    this.auditService.createAudit(payload).subscribe();
  }
}
