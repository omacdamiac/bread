import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosComponent } from '../../partials/usuarios/usuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatorService } from '@shared/lang';
import { AssignService, SecurityService } from '@data/services';
import { UTILS } from '@shared/utils/utils';
import { ISERVICES } from '@core/models';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TEXTAPP } from '@shared/const';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-permisos',
  templateUrl: './asignacion-permisos.component.html',
  styleUrls: ['./asignacion-permisos.component.scss'],
})
export class AsignacionPermisosComponent implements OnInit {
  title: string;
  load: boolean;
  formAssign!: FormGroup;
  btnAddUsers = new ButtonNsModel.ButtonClass(
    'Agregar usuario',
    'primary',
    'mx-3 my-3'
  );
  selectPerfil = new SelectNsModel.SelectClass('', 'perfil', false, '', []);
  selectRol = new SelectNsModel.SelectClass('', 'rol', false, '', []);

  animal!: string;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [
    'usuario',
    'nombre',
    'estado',
    'perfil',
    'rol',
    'acciones',
  ];
  btnBuscar = new ButtonNsModel.ButtonClass('BUSCAR', 'primary', '');
  btnLimpiar = new ButtonNsModel.ButtonClass('LIMPIAR', 'accent', '');

  dataSource: any;

  @ViewChildren('perfilesContent') perfilesContent!: QueryList<any>;
  @ViewChildren('content') content!: QueryList<any>;
  @ViewChildren('perfilesUser') perfilesUser!: QueryList<any>;
  @ViewChildren('rolesUser') rolesUser!: QueryList<any>;

  // @ViewChild('cell') cell!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  list_profile: any;
  noDataProfile: any;
  list_roles: any;
  list_users: any;
  list_relation: any;
  noDataRole: any;

  constructor(
    public dialog: MatDialog,
    private paginato: PaginatorService,
    private securityService: SecurityService,
    private assignService: AssignService,
    private toastrService: ToastrService,
    private utils: UTILS
  ) {
    this.load = false;
    this.noDataProfile = false;
    this.noDataRole;
    this.title = TEXTAPP.TITLE_SECURITY_ASIGNACION;
  }

  ngOnInit(): void {
    this.createForm();
    this.listUsers();
    this.listRol();
    this.listProfile();
    this.listRelationUser();
    this.paginato.getPaginatorIntl();
  }

  reload() {
    this.listUsers();
    this.listRelationUser();
  }
  createForm() {
    this.formAssign = new FormGroup({
      busqueda: new FormControl(''),
      // 'perfil' : new FormControl('')
      // form : new FormGroup({}),
      // relaciones : new FormArray([])
    });
  }
  // LISTADO-ROL
  listRol(): void {
    this.securityService
      .getRole()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          let data = res?.body?.data;
          // console.log(data);
          if (data.length !== 0) {
            this.list_roles = data;
            // console.log(data)
            // console.log(this.utils.mapperSelect(data))
            this.selectRol.options = this.utils.mapperSelect(data);
          } else {
            this.noDataRole = true;
          }
          // this.selectPadre.options = this.utils.mapperSelect(res);
          // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
          // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
        },
      });
  }
  // LISTADO-PERFIL
  listProfile() {
    this.securityService.getProfile().subscribe({
      next: (res: ISERVICES) => {
        let data = res?.body?.data;
        // console.log(data);
        if (data.length !== 0) {
          this.list_profile = data;
          this.selectPerfil.options = this.utils.mapperSelect(data);
          // console.log(this.selectPerfil.options);
        } else {
          this.noDataProfile = true;
        }
        // this.selectPadre.options = this.utils.mapperSelect(res);
        // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
        // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
      },
    });
  }
  // typeOf(e: any) {
  //   return typeof e;
  // }
  setNameProfile(e: any) {
    // return this.list_profile.filter((pro: any) => {
    //   if (pro.id_perfil === e) return pro;
    // });
    if (this.list_profile) {
      return this.list_profile.filter((pro: any) => pro.id_perfil === e);
    }
  }
  setNameRole(e: any) {
    // return this.list_roles.filter((rol: any) => {
    //   if (rol.id_rol === e) return rol;
    // });
    if (this.list_roles) {
      return this.list_roles.filter((rol: any) => rol.id_rol === e);
    }
  }
  // RELACION-USER
  listRelationUser() {
    this.assignService.getAssign().subscribe({
      next: (res: any) => {
        let data = res.data;
        this.list_relation = data;
        console.log(this.list_relation);

        if (this.list_users) {
          // let users = this.list_users;
          data.filter((rel: any) => {
            this.list_users
              .filter((user: any) => user.id_usuario == rel.id_usuario)
              .map((u: any) => {
                u.rol = rel.id_asigroles;
                u.perfil = rel.id_asigperfiles;
                console.log(u);
                return u;
              });
          });

          // data.filter((rel: any) => {
          //     rel.relation = this.list_users.map((user: any) => {
          //       // rel.id_usuario === user.id_usuario
          //       // console.log(rel);
          //       // console.log(user);
          //       if (rel.id_usuario === user.id_usuario) {
          //         // console.log(user);
          //         user.rol = rel.id_asigroles;
          //         user.perfil = rel.id_asigperfiles;
          //         // (rel.nombre = user.nombre), (rel.usuario = user.usuario);
          //         // rel.rol = String(rel.id_asigroles);
          //         // this.selectPerfil.options.map((el: any)=>{
          //         //   if( el.id==rel.id_asigroles) {
          //         //     console.log(el.nombre)
          //         //     rel.nuevo = el.nombre
          //         //   }
          //         // })
          //       }
          //     });
          //     // console.log(data);
          //   })
          this.dataSource = new MatTableDataSource(this.list_users);
          console.log(this.dataSource);
          // this.pagination();
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 500);
        }
      },
    });
  }
  createRelationUser(req: any) {
    // let data = this.utils.mapperRelationUsers(req);
    // console.log(data);
    // this.assignService.createAssign(req).subscribe()
    this.assignService.createAssign(req).subscribe({
      next: (as: ISERVICES) => {
        console.log(as);
        this.currentUser = 0;

        this.toastrService.info(as?.body?.message, 'Nuevo relación');
        this.reload();
        // this.mostrar = !this.mostrar;
        // this.editar = !this.editar;
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
    });
  }
  editRelationUser(payload: any) {
    this.assignService.editAssign(payload).subscribe({
      next: (as: ISERVICES) => {
        this.currentUser = 0;
        console.log(as);
        this.toastrService.info(as?.body?.message, 'Relación modificada');
        this.reload();
        // this.mostrar = !this.mostrar;
        // this.editar = !this.editar;
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
    });
  }
  // LISTADO-USER
  listUsers(): void {
    this.securityService
      .getUsers()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          let data = res?.body?.data;
          this.list_users = data;
          // this.dataSource = new MatTableDataSource(data);
          // this.pagination();
        },
      });
  }
  createUser(req: any): void {
    let payload = this.utils.mapperUser(req);
    console.log(payload);
    this.securityService.createUser(payload).subscribe({
      next: (user: ISERVICES) => {
        console.log(user?.body?.data);
        // console.log(pro);
        // (<FormGroup>this.formAssign.controls['form']).addControl('perfil', new FormControl(''));
        // (<FormGroup>this.formAssign.controls['form']).addControl('rol', new FormControl(''));
        this.toastrService.info(user?.body?.message, 'Nuevo usuario');
        // (<FormArray>this.formAssign.controls['relaciones']).push(new FormGroup({
        //   perfil: new FormControl(''),
        //   rol: new FormControl(''),
        // }));
        this.reload();
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
    });
  }
  editUsers(req: any, method?: boolean): void {
    let payload;
    if (method) {
      payload = req;
    } else {
      payload = this.utils.mapperUser(req);
    }
    this.securityService.editUser(payload).subscribe({
      next: (_) => {
        this.toastrService.info(_?.body?.message, 'Usuario modificado');
        this.reload();
        // this.dataSource = new MatTableDataSource(this.list_users);
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
    });
  }
  openDialog(body: any): void {
    // let component: any = UsuariosComponent;
    const dialogRef = this.dialog.open(UsuariosComponent, {
      width: TEXTAPP.DIALOG_WIDTH,
      data: body ? body : undefined,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        if (result?.id_usuario) {
          this.editUsers(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }
  // editar: boolean = true;
  // mostrar: boolean = false;
  currentUser = 0;
  edit(user: any, i: number) {
    // console.log(user);
    // console.log(i);
    // console.log(this.list_relation);

    // this.cmbRol = String(user.rol);
    // this.cmbPerfil = String(user.perfil);
    // this.mostrar = !this.mostrar;
    // this.editar = !this.editar;
    this.currentUser = user.id_usuario;

    // let pc = this.perfilesContent.toArray()[i].nativeElement[1]
    // // .classList.add('d-none')
    console.log(this.rolesUser.toArray());
    /*if(this.mostrar) {
      this.perfilesUser.toArray()[i].nativeElement.classList.remove('d-none')
    } else {
      this.perfilesUser.toArray()[i].nativeElement.classList.add('act')
    }*/

    setTimeout(() => {
      //let id =  document.querySelector('#rol_' + user.id_usuario);
      let filtroIdPerfil = this.perfilesUser
        .toArray()
        .filter((id) => id.nativeElement.id === 'perfil_' + user.id_usuario);
      let filtroIdRol = this.rolesUser
        .toArray()
        .filter((id) => id.nativeElement.id === 'rol_' + user.id_usuario);

      filtroIdPerfil[0].nativeElement.value = user.perfil;
      filtroIdRol[0].nativeElement.value = user.rol;
      // console.log(this.perfilesUser.toArray()[i].nativeElement.id);
      //this.perfilesUser.toArray()[i].nativeElement.value = user.perfil;
      //this.rolesUser.toArray()[i].nativeElement.value = user.rol;
      // const bodyElement = document.querySelectorAll('select');
      // console.log(bodyElement);
      // let docu = document.querySelector('td div[name="cont"]>div');
      console.log(this.perfilesUser.toArray()[i].nativeElement);
      // let div = this.content.toArray()[i].nativeElement;
      // console.log(div.id);
      // di[i].nativeElement.classList.add(TEXTAPP.CLASS_DNONE);
      // if(this.mostrar) {
      //   this.perfilesUser.toArray()[i].nativeElement.value = user.perfil;
      //   this.rolesUser.toArray()[i].nativeElement.value = user.rol;
      // }

      // console.log(this.perfilesUser.toArray()[2].nativeElement.classList.add('pe-none'));
      // console.log(this.rolesUser.toArray());
    }, 1000);

    let relacion = this.list_relation.filter(
      (rel: any) => rel.id_usuario === user.id_usuario
    );
    // console.log(relacion);
    this.id_relation = relacion[0].id_asigaccesos;

    /**
     * DEscomentar para guardar data
     * 
    let data = this.utils.mapperRelationUsers({
      ...user,
      ...{ rol: user.rol, perfil: user.perfil },
    });
    console.log(data);
 */

    // setTimeout(() => {
    //   this.formAssign.controls['rol'].setValue(user.rol);
    //   this.formAssign.controls['perfil'].setValue(user.perfil);
    //   // this.formAssign.controls['rol'].value = 2
    //   this.selectRol.value = 2;
    // }, 1000);
  }
  id_relation!: number;
  editRelation(newRel: any) {
    console.log(newRel);
    console.log(this.cmbRol);
    console.log(this.cmbPerfil);
    let data = this.utils.mapperRelationEditarUser(
      newRel,
      this.id_relation,
      this.cmbRol,
      this.cmbPerfil
    );
    console.log(data);
    this.editRelationUser(data);
  }
  // ASIGNACIÓN
  cmbRol!: any;
  cmbPerfil!: any;
  save(e: any, i: number) {
    console.log(e.id_usuario);
    // console.log(this.cmbRol);
    // console.log(this.cmbPerfil);

    let filtroIdPerfil = this.perfilesUser
      .toArray()
      .filter((id) => id.nativeElement.id === 'perfil_' + e.id_usuario);
    let filtroIdRol = this.rolesUser
      .toArray()
      .filter((id) => id.nativeElement.id === 'rol_' + e.id_usuario);
    // let filtroIdPerfil = this.perfilesUser.toArray()[i].nativeElement
    // let filtroIdRol = this.rolesUser.toArray()[i].nativeElement
    console.log(filtroIdPerfil[0].nativeElement.value);
    console.log(filtroIdRol[0].nativeElement.value);

    // if (this.cmbPerfil === undefined && this.cmbRol === undefined) {
    if (
      filtroIdPerfil[0].nativeElement.value === 'Seleccione' &&
      filtroIdRol[0].nativeElement.value === 'Seleccione'
    ) {
      this.utils.showSwalAlertr(
        'Asignación',
        'Debe asignar Perfil y Rol',
        false
      );
    } else {
      let data = this.utils.mapperRelationUsers({
        ...e,
        ...{
          rol: Number(filtroIdRol[0].nativeElement.value),
          perfil: Number(filtroIdPerfil[0].nativeElement.value),
        },
      });
      console.log(data);
      this.createRelationUser(data);
    }
  }
  action(e: any, type: string) {
    if (type == 'rol') {
      this.cmbRol = e.value;
    } else if (type == 'perfil') {
      this.cmbPerfil = e.value;
    }

    console.log(e.value);
    // this.selectRol.value = e;
    // this.editar = false;
  }
  delete(data: any, item?: any): void {
    let relacion = this.list_relation.filter(
      (rel: any) => rel.id_usuario === data.id_usuario
    );
    Swal.fire({
      title: '¿Desea eliminar?',
      text:
        'Seguro que desea eliminar "' +
        data.usuario +
        '", No se puede revertir este proceso',
      icon: 'info',
      showCancelButton: true,
      cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
      confirmButtonColor: TEXTAPP.COLOR_BUTTON,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
    }).then((result): any => {
      console.log(result);

      if (result.isConfirmed) {
        if (relacion?.length !== 0) {
          console.log('existe');
          let payload = this.utils.deleteUser(data);
          console.log(payload);
          this.editUsers(payload, true);
          this.editRelationUser(this.utils.deleteRelationUser(relacion[0]));
        } else {
          console.log('No existe');
          let payload = this.utils.deleteUser(data);
          console.log(payload);
          this.editUsers(payload, true);
        }
      }
    });
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  trackByFn(index: number, item: any) {
    return item.id_usuario;
  }
  clear() {
    const filterValue = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search() {
    console.log(this.formAssign.controls.busqueda.value);
    console.log(event);

    const filterValue = this.formAssign.controls.busqueda.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
