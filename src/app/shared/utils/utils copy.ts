import { MatPaginatorIntl } from '@angular/material/paginator';
import { IFUNCIONALITY, IPROFILE, ISELECT, ISUBFUNCIONALITY } from '@core/models';
import Swal from 'sweetalert2';
import { COMPONENTES, TEXTAPP } from '../const';
import { ToastrService } from 'ngx-toastr';
import { FuncionalityService, SecurityService } from '@data/services';

export class UTILS {
  static toastrService: ToastrService;
  constructor(
    public paginato: MatPaginatorIntl,
    public readonly toastrService: ToastrService,
    public readonly securityService: SecurityService,
    public readonly funcionalityService: FuncionalityService,
    ) {}
  static getPaginatorIntl() {
    let paginato = new MatPaginatorIntl();
    paginato.itemsPerPageLabel = 'Items por página';
    paginato.nextPageLabel = 'Página siguiente ';
    paginato.previousPageLabel = 'Página anterior';
    paginato.firstPageLabel = 'Primera página';
    paginato.lastPageLabel = 'Última página';
  }

  static getDutchPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Items per pagina:';
    paginatorIntl.nextPageLabel = 'Volgende pagina';
    paginatorIntl.previousPageLabel = 'Vorige pagina';
    // paginatorIntl.getRangeLabel = dutchRangeLabel;

    return paginatorIntl;
  }

  static mapperUserList(data: any) {
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

  static setListHeader(items: any): string[] {
    let displayedColumns: string[] = [];
    for (var key in items[0]) {
      displayedColumns.push(key);
    }
    return displayedColumns;
  }

  static mapperNewfunctionality(element: any, ind: number): IFUNCIONALITY {
    return {
      id: element.id ? element.id : ind + 1,
      nombre_funcionalidad: element.funcionalidad,
      link: element.link,
      icono: element.icono,
      fecha_creacion: new Date(),
      estado: element.estado ? 1 : 0,
    };
  }

  static mapperNewSubfunctionality(element: any, ind: number): ISUBFUNCIONALITY {
    return {
      id: element.id ? element.id : ind + 1,
      id_funcionalidad: Number(element.padre),
      nombre_subfuncionalidad: element.subfuncionalidad,
      link: element.link,
      icono: '',
      fecha_creacion: new Date(),
      estado: element.estado ? 1 : 0,
    };
  }
  static mapperProfile(element: any, ind: number): IPROFILE {
    return {
      id: element.id ? element.id : ind + 1,
      fecha_creacion: new Date(),
      nombre_perfil: element.nombre_perfil,
      estado: element.estado ? 0 : 1,
    };
  }
  static mapperfunctionalityOLD(element: any): any {
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

  static mapperSelect(data: any[]): ISELECT[] {
    let arr = [];
    for (let i of data) {
      let item = {
        nombre: i.nombre_funcionalidad,
        id: i.id,
      };
      arr.push(item);
    }
    return arr;
  }


  static ObjectUpdatePerfil(): any {
    // UPDATE
    return {
      fecha_creacion: 'Sun, 01 Jam 2023 00:00:00 GMT',
      nombre_perfil: 'Contabilidad',
      estado: 1,
      id_perfil: 1,
    };
  }

  static deleteItem(id: number, item: string): void {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Seguro que desea eliminar este item, No se puede revertir este proceso',
      icon: 'info',
      showCancelButton: true,
      cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
      confirmButtonColor: TEXTAPP.COLOR_BUTTON,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        switch (item) {
          case COMPONENTES.FUNCIONALIDAD: {
            // componente = FuncionalidadComponent;
            break;
          }
          case COMPONENTES.SUBFUNCIONALIDAD: {
            // componente = SubfuncionalidadComponent;
            break;
          }
          case COMPONENTES.ROL: {
            // componente = RolComponent;
            break;
          }
          case COMPONENTES.PERFIL: {
            console.log('ENTRO')
                this.toastrService.info('Se elimino correctamente', 'Eliminando');
            // console.log(id);
            // this.securityService.deleteProfile(id).subscribe({
            //   next: (_) => {
            //     this.toastrService.info('Se elimino correctamente', 'Eliminando');
            //     this.listFuncionality();
            //   },
            //   error: (err) => this.toastrService.info(err.message, err.statusText),
            // });
            break;
          }
          default: {
            //statements;
            break;
          }
        }
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your file has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  }
  /**
   * MAPPER
   * */
  // static mapper(value) {
  //   let code: number;
  //   for (let i in value) {
  //     if (typeof value[i] === 'number') {
  //       code = value[i];
  //     }
  //   }
  //   return {
  //     id: code,
  //     text: value.name,
  //     value: code,
  //   };
  // }
  // static mapperPlayer(value) {
  //   return {
  //     id: value.player_code,
  //     text: value.name,
  //     value: value.player_code,
  //     img: value.url_image,
  //     country_code: value.country_code,
  //     sport_code: value.sport_code,
  //   };
  // }
}
