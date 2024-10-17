import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { FuncionalityService, SecurityService } from '@data/services';
import {
  CHKF,
  CHKR,
  IFUNCIONALITY,
  IPERMISSION,
  IPROFILE,
  IRELATIONPF,
  IRELATIONRP,
  IROL,
  ISERVICES,
  ISUBFUNCIONALITY,
} from '@core/models';
import { UTILS } from '@shared/utils/utils';
import Swal from 'sweetalert2';
import { SelectNsModel } from '@shared/components/select/model/select-ns.model';
import { FormGroup } from '@angular/forms';
import { COMPONENTES } from '@shared/const/mantenimiento.enum';
import {
  FuncionalidadComponent,
  PerfilComponent,
  PermisosComponent,
  RolComponent,
  SubfuncionalidadComponent,
} from '../../partials';
import { ToastrService } from 'ngx-toastr';
import { TEXTAPP } from '@shared/const';
import { map, switchMap, take } from 'rxjs/operators';
import { SecurityPresenterService } from '@data/presenter';
import { Router } from '@angular/router';
// import { FuncionalidadComponent } from '../../partials/funcionalidad/funcionalidad.component';
// import { RolComponent } from '../../partials/rol/rol.component';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss'],
})
export class MantenimientoComponent implements OnInit {
  @ViewChildren('subs') subs!: QueryList<any>;
  title: string;
  formUsers!: FormGroup;
  load: boolean;
  show: boolean;
  showFunc: boolean;
  btnAddUsers = new ButtonNsModel.ButtonClass(
    'Agregar usuarios',
    'primary',
    'mx-3 my-3'
  );
  btnAddFunction = new ButtonNsModel.ButtonClass(
    'Agregar funcionalidad',
    'primary',
    'mx-3 my-3'
  );
  btnAddSubFunction = new ButtonNsModel.ButtonClass(
    'Agregar sub-funcionalidad',
    'primary',
    'mx-3 my-3'
  );
  btnAddPerfil = new ButtonNsModel.ButtonClass(
    'Agregar perfil',
    'primary',
    'mx-3 my-3'
  );
  btnAddPermiso = new ButtonNsModel.ButtonClass(
    'Agregar permiso',
    'primary',
    'mx-3 my-3'
  );
  btnUpdatePerfil = new ButtonNsModel.ButtonClass(
    'Actualizar',
    'primary',
    'mx-3 my-3'
  );
  btnDeletePerfil = new ButtonNsModel.ButtonClass(
    'Eliminar',
    'accent',
    'mx-3 my-3'
  );
  btnAddRol = new ButtonNsModel.ButtonClass(
    'Agregar rol',
    'primary',
    'mx-3 my-3'
  );
  btnUpdateRol = new ButtonNsModel.ButtonClass(
    'Actualizar',
    'primary',
    'mx-3 my-3'
  );
  btnDeleteRol = new ButtonNsModel.ButtonClass(
    'Eliminar',
    'accent',
    'mx-3 my-3'
  );
  btnEdit = new ButtonNsModel.ButtonClass('EDITAR', 'primary', '');
  btnSave = new ButtonNsModel.ButtonClass('GUARDAR', 'primary', '');

  service: ISERVICES = {};
  selectPadre = new SelectNsModel.SelectClass('', 'padre', false, '', []);
  title_functionality: any;
  body_role: any;
  body_profile: any;
  list: any;
  list_functionality: any;
  list_subfunctionality: any;
  list_profile!: IPROFILE[];
  list_permissions: IPERMISSION[];
  list_roles!: IROL[];
  list_users: any;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  noDataProfile: boolean;
  noDataRole: boolean;
  noDataFun: boolean;
  constructor(
    public dialog: MatDialog,
    private securityService: SecurityService,
    private funcionalityService: FuncionalityService,
    private toastrService: ToastrService,
    private spService: SecurityPresenterService,
    private router: Router,
    private utils: UTILS
  ) {
    this.list_permissions = [];
    this.load = false;
    this.show = true;
    this.showFunc = true;
    this.title_functionality = undefined;
    this.body_role = undefined;
    this.body_profile = undefined;
    this.noDataProfile = false;
    this.noDataRole = false;
    this.noDataFun = false;
    this.title = TEXTAPP.TITLE_SECURITY_MANTENIMIENTO;
  }
  allComplete: boolean = false;

  chkFuncionalidades: CHKF = {
    id_funcionalidad: 1,
    name: 'Seleccionar todo',
    checked: false,
    functionalities: [],
  };
  chkPermissions: CHKR = {
    id_permiso: 1,
    name: 'Seleccionar todo',
    checked: false,
    permissions: [],
  };
  panelOpenState = false;
  ngOnInit(): void {
    this.createForm();
    // this.relacionRP();
    this.listFuncionality();
    this.listSubFuncionality();
    this.listado();
    this.listProfile();
    this.listPermiso();
    this.listRol();
    // console.log(this.list);
  }

  adminProfile() {
    this.listProfile();
    this.listFuncionality();
  }
  adminRole() {
    this.listRol();
  }

  createForm() {
    this.formUsers = new FormGroup({});
  }
  test(e: any) {
    console.log(e);
  }
  noData = false;
  arr: any[] = [];
  listado(): void {
    this.funcionalityService
      .getFuncionality()
      .pipe(
        switchMap((res: any) => {
          return this.funcionalityService.getSubFuncionality().pipe(
            map((sub: any) => {
              // console.log(res.data);
              // console.log(sub.data);
              if (res.data.length !== 0) {
                this.noDataFun = false;
                res.data.filter((y: any) => {
                  y.childs = sub.data.filter(
                    (x: any) => x.id_funcionalidad === y.id_funcionalidad
                  );
                  //  console.log(dd)
                  // {
                  //   // console.log(x);
                  //   // console.log(res.data);
                  //   if (x.id_funcionalidad === y.id_funcionalidad) {
                  //     console.log(y);
                  //     // console.log(x)
                  //     this.arr.push(x);
                  //     y.childs = this.arr;
                  //     this.arr = [];
                  //   }
                  // });
                });
                // console.log(datos);
              } else {
                this.noDataFun = true;
              }
              // console.log(this.arr);
              this.list = res.data;
              //return res
            })
          );
        })
      )
      .subscribe();
  }
  // FUNCIONALIDAD
  listFuncionality(): void {
    this.funcionalityService
      .getFuncionality()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          this.service = res;
          let data = res?.body?.data;
          // next: (res: any) => {
          //   let data = res.data;
          console.log(data);
          this.chkFuncionalidades.functionalities =
            this.utils.mapperFuncionalityCHK(data);
          this.list_functionality = data;
          this.selectPadre.options = this.utils.mapperSelect(data);
          // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
          // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => {
          this.utils.createAudit(this.service, this.router.url);
        },
      });
  }
  createFun(payload: IFUNCIONALITY) {
    let repeat = this.utils.validateNamefunctionality(
      payload,
      this.list_functionality
    );

    console.log(repeat.length);
    if (repeat.length === 0) {
      this.funcionalityService.createFuncionality(payload).subscribe({
        next: (fnc: ISERVICES) => {
          this.service = fnc;
          this.listado();
          this.toastrService.info(fnc?.body?.message, 'Nueva funcionalidad');
        },
        complete: () => this.utils.createAudit(this.service, this.router.url),
        // error: (err) => this.toastrService.info(err.message, err.statusText),
      });
    } else {
      Swal.fire({
        title: 'No se creo la funcionalidad',
        text: 'El nombre elegido ya se está encuentra en uso',
        icon: 'info',
        showCancelButton: false,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    }
  }
  editFun(payload: IFUNCIONALITY) {
    this.funcionalityService.editFuncionality(payload).subscribe({
      next: (_) => {
        this.service = _;
        this.listado();
        this.toastrService.info(_?.body?.message, 'Funcionalidad editada');
      },
      complete: () => this.utils.createAudit(this.service, this.router.url),
      // error: (err) => this.toastrService.info(err.message, err.statusText),
    });
  }
  // SUBFUNCIONALIDAD
  listSubFuncionality() {
    this.funcionalityService
      .getSubFuncionality()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          this.service = res;
          let data = res?.body?.data;
          // next: (res: any) => {
          //   let data = res.data;
          console.log(data);
          this.list_subfunctionality = data;
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
  }
  createSubFun(payload: ISUBFUNCIONALITY) {
    let repeat = this.utils.validateNameSubfunctionality(
      payload,
      this.list_subfunctionality
    );

    if (repeat.length === 0) {
      this.funcionalityService.createSubFuncionality(payload).subscribe({
        next: (subFnc: ISERVICES) => {
          this.service = subFnc
          this.listado();
          this.toastrService.info(
            subFnc?.body?.message,
            'Nueva subfuncionalidad'
          );
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
    } else {
      Swal.fire({
        title: 'No se creo la subfuncionalidad',
        text: 'El nombre elegido ya se está encuentra en uso',
        icon: 'info',
        showCancelButton: false,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    }
  }
  editSubFun(payload: ISUBFUNCIONALITY) {
    this.funcionalityService.editSubFuncionality(payload).subscribe({
      next: (_) => {
        this.service = _;
        this.listado();
        this.toastrService.info(_?.body?.message, 'Subfuncionalidad editada');
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => this.utils.createAudit(this.service, this.router.url)
    });
  }
  // PROFILE
  listProfile() {
    this.securityService
      .getProfile()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          this.service = res;
          let data = res?.body?.data;
          console.log(data);
          if (data.length !== 0) {
            this.noDataProfile = false;
            this.list_profile = data;
          } else {
            this.noDataProfile = true;
          }
          // this.selectPadre.options = this.utils.mapperSelect(res);
          // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
          // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
        },
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
  }
  createProfile(payload: IPROFILE): void {
    let repeat = this.utils.validateNameProfile(payload, this.list_profile);
    console.log(repeat);

    if (repeat.length === 0) {
      this.securityService.createProfile(payload).subscribe({
        next: (pro: ISERVICES) => {
          this.service = pro;
          console.log(pro);
          this.listProfile();
          this.toastrService.info(pro?.body?.message, 'Nuevo perfil');
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url),
      });
    } else {
      Swal.fire({
        title: 'No se creo el perfil',
        text: 'El nombre elegido ya se está encuentra en uso',
        icon: 'info',
        showCancelButton: false,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    }
  }
  editProfile(payload: IPROFILE): void {
    this.securityService.editProfile(payload).subscribe({
      next: (_) => {
        this.service = _;
        this.listProfile();
        this.toastrService.info(_?.body?.message, 'Perfil editado');
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => this.utils.createAudit(this.service, this.router.url)
    });
  }
  // ROLE
  listRol(): void {
    this.securityService
      .getRole()
      .pipe(take(1))
      .subscribe({
        next: (res: ISERVICES) => {
          this.service = res;
          let data = res?.body?.data;
          console.log(data);
          if (data.length !== 0) {
            this.noDataRole = false;
            this.list_roles = data;
          } else {
            this.noDataRole = true;
          }
          // this.selectPadre.options = this.utils.mapperSelect(res);
          // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
          // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
        },
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
  }
  createRol(payload: IROL): void {
    let repeat = this.utils.validateNameRole(payload, this.list_roles);

    if (repeat.length === 0) {
      this.securityService.createRole(payload).subscribe({
        next: (rol: ISERVICES) => {
          this.service = rol;
          console.log(rol);
          this.listRol();
          this.toastrService.info(rol?.body?.message, 'Nuevo rol');
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url),
      });
    } else {
      Swal.fire({
        title: 'No se creo el rol',
        text: 'El nombre elegido ya se está encuentra en uso',
        icon: 'info',
        showCancelButton: false,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    }
  }
  editRol(payload: IROL): void {
    this.securityService.editRole(payload).subscribe({
      next: (_) => {
        this.service = _;
        this.toastrService.info(_?.body?.message, 'Rol editado');
        this.listRol();
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => this.utils.createAudit(this.service, this.router.url)
    });
  }
  // PERMISSIONS
  listPermiso(): void {
    this.spService.serviceSP.pipe(take(1)).subscribe({
      next: (response: any) => {
        this.service = response;
        let data = response[0].data;
        console.log(data);
        this.list_permissions = data;
        this.chkPermissions.permissions = this.utils.mapperPermissionCHK(data);
      }
    });
    // this.securityService.getPermission().subscribe({
    //   next: (res: ISERVICES[]) => {
    //     console.log(res[0].data);

    //     this.list_permissions = res[0].data;
    //     this.chkPermissions.permissions = this.utils.mapperPermissionCHK(
    //       res[0].data
    //     );
    //     console.log(this.chkPermissions.permissions);
    //     // this.selectPadre.options = this.utils.mapperSelect(res);
    //     // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
    //     // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
    //   },
    // });
  }
  // listPermisoOLD(): void {
  //   this.securityService
  //     .getPermission()
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (res: ISERVICES[]) => {
  //         console.log(res[0].data);

  //         this.list_permissions = res[0].data;
  //         this.chkPermissions.permissions = this.utils.mapperPermissionCHK(
  //           res[0].data
  //         );
  //         console.log(this.chkPermissions.permissions);
  //         // this.selectPadre.options = this.utils.mapperSelect(res);
  //         // this.perfiles.subtasks = this.utils.mapperfunctionality(res);
  //         // next: (res: any)=> console.log(this.utils.mapperfunctionality(res)),
  //       },
  //     });
  // }
  // createPermiso(req: any): void {
  //   this.securityService.createPermission(req).subscribe({
  //     next: (per) => {
  //       console.log(per);
  //       this.toastrService.info(
  //         'Se creo "' + per.nombre_permiso + '"',
  //         'Nuevo permiso'
  //       );
  //       this.listPermiso();
  //     },
  //     error: (err) => this.toastrService.info(err.message, err.statusText),
  //   });
  // }
  // editPermiso(per: any): void {
  //   this.securityService.editPermission(per).subscribe({
  //     next: (_) => this.listPermiso(),
  //     error: (err) => this.toastrService.info(err.message, err.statusText),
  //   });
  // }
  // relacion rol-permiso
  relacionData: any;
  relacionRP(item: any): void {
    console.log(item);
    this.body_role = Object.assign([], { ...item });
    this.securityService
      .getRelationRP()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.service = res;
          let data = res.data;
          this.relacionData = data;

          // this.relacionData = res.map((x: any) => x)[0].data;
          // this.relacionData = res.map((x: any) => x)[0].data;
          this.body_role.relaciones = this.relacionData.filter(
            (rel: any) => item.id_rol === rel.id_rol
          );
          console.log(this.body_role);
          this.chkPermissions.permissions = this.utils.mapperPermissionCHK(
            this.list_permissions
          );
          if (this.relacionData) {
            this.relacionData.filter((elemnt: any) => {
              // this.list_roles.filter((per:any)=>{
              if (elemnt.id_rol == item.id_rol) {
                // if(per.id === elemnt.id_permisos) {
                this.list_permissions.filter((e: any) => {
                  if (e.id_permiso === elemnt.id_permiso) {
                    if (this.chkPermissions.permissions) {
                      this.chkPermissions.permissions.filter((x: any) => {
                        if (elemnt.id_permiso === x.id_permiso) {
                          x.checked = true;
                        }
                      });
                    }
                  }
                });
                console.log(this.chkPermissions.permissions);
                // }
              }
              // })
              return;
            });
          }
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
    // setTimeout(() => {
    //   console.log(this.relacionData);
    //   if (this.relacionData.length !== 0) {
    //     this.relacionData.filter((elemnt: any) => {
    //       console.log(elemnt);
    //       // this.list_roles.filter((per:any)=>{
    //       console.log(elemnt.id_rol);
    //       console.log(item.id_rol);
    //       if (elemnt.id_rol == item.id_rol) {
    //         // if(per.id === elemnt.id_permisos) {
    //         this.list_permissions.filter((e: any) => {
    //           if (e.id === elemnt.id_permiso) {
    //             if (this.chkPermissions.permissions) {
    //               this.chkPermissions.permissions.filter((x: any) => {
    //                 if (elemnt.id_permiso === x.id) {
    //                   x.checked = true;
    //                 }
    //               });
    //             }
    //           }
    //         });
    //         console.log(this.chkPermissions.permissions);
    //         // }
    //       }
    //       // })
    //       return;
    //     });
    //   }
    // }, 500);
  }
  createRelacionRP(req: any) {
    console.log(req);
    let datos = this.utils.mapperCreateRelationRP(
      req,
      this.chkPermissions.permissions
    );
    console.log(datos);
    this.securityService.createRelation(datos).subscribe({
      next: (m: ISERVICES) => {
        this.service = m;
        this.toastrService.info(m?.body?.message, 'Nueva Relacion');
        // this.listSubFuncionality();
        console.log(this.body_role.relaciones);
        console.log(m?.body?.data);
        this.body_role.relaciones = [m?.body?.data];
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => this.utils.createAudit(this.service, this.router.url),
    });
  }
  editRelacionRP(req: any) {
    // let relaciones = this.relacionDataProfile.filter(
    //   (relacion: any) => relacion.id_perfiles === req.id_perfil
    // );
    let cheks = this.chkPermissions.permissions.filter(
      (chk: any) => chk.checked === true
    );
    let nuevos = cheks.filter(
      (chk: any) =>
        !req.relaciones.some((rel: any) => chk.id_permiso === rel.id_permiso)
    );
    let editados = req.relaciones.filter((rel: any) =>
      this.chkPermissions.permissions.some(
        (chk: any) => rel.id_permiso === chk.id_permiso && chk.checked === false
      )
    );
    console.log(nuevos);
    console.log(editados);

    if (nuevos.length === 0 && editados.length === 0) {
      Swal.fire({
        title: '¡Sin cambios!',
        text: 'no se encontrarón cambios en la asignación',
        icon: 'info',
        showCancelButton: true,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: false,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    } else {
      if (nuevos.length !== 0) {
        let payload = this.utils.mapperNewEditedRelationRP(nuevos, req);
        console.log(payload);
        this.securityService.createRelation(payload).subscribe({
          next: (m: ISERVICES) => {
            this.service = m;
            this.toastrService.info(m?.body?.message, 'Relacion editada');
            // this.listSubFuncionality();
          },
          // error: (err) => this.toastrService.info(err.message, err.statusText),
          complete: () => this.utils.createAudit(this.service, this.router.url)
        });
      }
      if (editados.length !== 0) {
        let edited = this.utils.mapperEditEditedRelationRP(editados, req);
        console.log(edited);
        let n = 0;
        for (let e of edited) {
          this.securityService.editRelation(e).subscribe({
            next: (m: ISERVICES) => {
              this.service = m;
              if (this.body_role.relaciones.length - editados.length == 0) {
                this.body_role.relaciones = [];
              }
              let index = edited.length;
              console.log(index);

              let final = index - n++;
              console.log(n++);
              console.log(final);
              if (final === 0) {
                this.toastrService.info(m?.body?.message, 'Relacion editada');
              }
              // this.listSubFuncionality();
            },
            error: (err) =>
              this.toastrService.info(err.message, err.statusText),
              complete: () => this.utils.createAudit(this.service, this.router.url)
          });
        }
      }
    }
  }
  // relacion perfil-funcionalidad
  relacionDataProfile: any;
  relation(perfil: IPROFILE) {
    // this.body_profile;
    //  = [{...perfil}];

    this.securityService
      .getRelationPF()
      .pipe(take(1))
      .subscribe({
        next: (relaciones: ISERVICES) => {
          this.service = relaciones;
          let data = relaciones?.body?.data;
          this.relacionDataProfile = data;
          // console.log(profile);
          // console.log(data);

          let dprofile = data.filter((relacion: IRELATIONPF) =>
            [{ ...perfil }].some(
              (pro: IPROFILE) => pro.id_perfil == relacion.id_perfiles
            )
          );
          console.log(perfil);
          // console.log(this.chkFuncionalidades.functionalities);
          // data.filter((relacion: IRELATIONPF) => {})

          // funcionalidad.checked = funcionalidad.id_funcionalidad === dprofile[0].id_funcionalidad

          // this.chkFuncionalidades.functionalities.filter((funcionalidad: any) => [perfil].filter((per: any)=> per.funcionalidades.map((p:any)=> funcionalidad.checked = p.id_funcionalidad === per.id_funcionalidad) ));
          [perfil].map(
            (element: any) =>
              (element.funcionalidades =
                this.utils.mapperFuncionalityCHKRelation(
                  dprofile,
                  this.chkFuncionalidades.functionalities
                ))
          );
          console.log(perfil);
        },
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
    this.body_profile = perfil;
    console.log(this.chkFuncionalidades.functionalities);
    // this.listFuncionality();
    // setTimeout(() => {
    //   this.chkFuncionalidades.functionalities =
    //   this.utils.mapperFuncionalityCHK(this.body_profile.funcionalidades);

    // }, 500);
  }
  relacionPFOld(item: any): void {
    console.log(item);
    this.body_profile = Object.assign([], { ...item });
    this.securityService
      .getRelationPF()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.service = res;
          let data = res.data;
          // console.log(data);
          this.relacionDataProfile = data;
          // console.log(this.relacionDataProfile);

          this.body_profile.relaciones = this.relacionDataProfile.filter(
            (rel: any) => item.id_perfil === rel.id_perfiles
          );
          // console.log(marcados);
          // [{...this.body_profile}].map((res: any)=>res.relaciones = marcados);
          // this.body_profile.map((res: any)=>res.relaciones = marcados);
          console.log(this.body_profile);
          this.chkFuncionalidades.functionalities =
            this.utils.mapperFuncionalityCHK(this.list_functionality);
          // console.log(this.chkFuncionalidades.functionalities);
          if (this.relacionDataProfile) {
            this.relacionDataProfile.filter((element: any) => {
              // this.list_roles.filter((per:any)=>{
              if (element.id_perfiles == item.id_perfil) {
                // if(per.id_perfil === elemnt.id_permisos) {
                // console.log(this.list_functionality);
                this.list_functionality.filter((e: any) => {
                  if (e.id_funcionalidad === element.id_funcionalidad) {
                    if (this.chkFuncionalidades.functionalities) {
                      this.chkFuncionalidades.functionalities.filter(
                        (x: any) => {
                          if (element.id_funcionalidad === x.id_funcionalidad) {
                            x.checked = true;
                          }
                        }
                      );
                    }
                  }
                });
                console.log(this.chkFuncionalidades.functionalities);
                // }
              }
              // })
              return;
            });
          }
        },
        // error: (err) => this.toastrService.info(err.message, err.statusText),
        complete: () => this.utils.createAudit(this.service, this.router.url)
      });
    // setTimeout(() => {
    //   if (this.relacionDataProfile) {
    //     this.relacionDataProfile.filter((element: any) => {
    //       // this.list_roles.filter((per:any)=>{
    //       if (element.id_perfiles == item.id_perfil) {
    //         // if(per.id_perfil === elemnt.id_permisos) {
    //         // console.log(this.list_functionality);
    //         this.list_functionality.filter((e: any) => {
    //           // console.log(e);

    //           if (e.id_funcionalidad === element.id_funcionalidad) {
    //             if (this.chkFuncionalidades.functionalities) {
    //               this.chkFuncionalidades.functionalities.filter((x: any) => {
    //                 if (element.id_funcionalidad === x.id_funcionalidad) {
    //                   x.checked = true;
    //                 }
    //               });
    //             }
    //           }
    //         });
    //         console.log(this.chkFuncionalidades.functionalities);
    //         // }
    //       }
    //       // })
    //       return;
    //     });
    //   }
    // }, 500);
  }
  createRelacionPF(req: any) {
    console.log(req);
    let datos = this.utils.mapperCreateRelationPF(
      req,
      this.chkFuncionalidades.functionalities
    );
    // .filter((el: any) => el.estado === 1);
    console.log(datos);
    this.securityService.createRelationPF(datos).subscribe({
      next: (m: ISERVICES) => {
        this.service = m;
        this.toastrService.info(m?.body?.message, 'Nueva Relacion');
        // this.listSubFuncionality();
        this.body_profile.relaciones = [m?.body?.data];
      },
      // error: (err) => this.toastrService.info(err.message, err.statusText),
      complete: () => this.utils.createAudit(this.service, this.router.url)
    });
  }
  editRelacionPF(req: any) {
    // let relaciones = this.relacionDataProfile.filter(
    //   (relacion: any) => relacion.id_perfiles === req.id_perfil
    // );
    let cheks = this.chkFuncionalidades.functionalities.filter(
      (chk: any) => chk.checked === true
    );
    let nuevos = cheks.filter(
      (chk: any) =>
        !req.relaciones.some(
          (rel: any) => chk.id_funcionalidad === rel.id_funcionalidad
        )
    );
    let editados = req.relaciones.filter((rel: any) =>
      this.chkFuncionalidades.functionalities.some(
        (chk: any) =>
          rel.id_funcionalidad === chk.id_funcionalidad && chk.checked === false
      )
    );

    if (nuevos.length === 0 && editados.length === 0) {
      Swal.fire({
        title: '¡Sin cambios!',
        text: 'no se encontrarón cambios en la asignación',
        icon: 'info',
        showCancelButton: true,
        cancelButtonColor: TEXTAPP.COLOR_BUTTON_WHITE,
        confirmButtonColor: TEXTAPP.COLOR_BUTTON,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        showConfirmButton: false,
        showCloseButton: true,
      }).then((result): any => {
        if (result.isConfirmed) {
        }
      });
    } else {
      if (nuevos.length !== 0) {
        let payload = this.utils.mapperNewEditedRelationPF(nuevos, req);
        console.log(payload);
        this.securityService.createRelationPF(payload).subscribe({
          next: (m: ISERVICES) => {
            this.service = m;
            this.toastrService.info(m?.body?.message, 'Relacion editada');
            // this.listSubFuncionality();
          },
          // error: (err) => this.toastrService.info(err.message, err.statusText),
          complete: () => this.utils.createAudit(this.service, this.router.url)
        });
      }
      if (editados.length !== 0) {
        let edited = this.utils.mapperEditEditedRelationPF(editados, req);
        console.log(edited);
        let n = 0;
        for (let e of edited) {
          this.securityService.editRelationPF(e).subscribe({
            next: (m: ISERVICES) => {
              this.service = m;
              if (this.body_profile.relaciones.length - editados.length == 0) {
                this.body_profile.relaciones = [];
              }
              let index = edited.length;
              console.log(this.body_profile.relaciones);
              // console.log(m.data);

              let final = index - n++;
              // console.log(n++);
              // console.log(final);
              if (final === 0) {
                this.toastrService.info(m?.body?.message, 'Relacion editada');
              }
              // this.listSubFuncionality();
            },
            // error: (err) => this.toastrService.info(err.message, err.statusText),
            complete: () => this.utils.createAudit(this.service, this.router.url)
          });
        }
      }
    }
  }
  delete(data: any, item?: any): void {
    let btnhow, mensaje;
    if (item === 'funcionalidad' && data.childs.length !== 0) {
      mensaje =
        'No puede elimnar funcionalidad con subfuncionalidades incluidas';
      btnhow = false;
    } else {
      mensaje =
        'Seguro que desea eliminar este item, No se puede revertir este proceso';
      btnhow = true;
    }

    Swal.fire({
      title: '¿Desea eliminar?',
      text: mensaje,
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
        switch (item) {
          case COMPONENTES.FUNCIONALIDAD: {
            let payload = this.utils.deleteFun(data);
            this.funcionalityService.editFuncionality(payload).subscribe({
              next: (_) => {
                this.toastrService.info(
                  'Se elimino correctamente',
                  'Eliminando funcionalidad'
                );
                this.listado();
              },
              error: (err) =>
                this.toastrService.info(err.message, err.statusText),
            });
            break;
          }
          case COMPONENTES.SUBFUNCIONALIDAD: {
            let payload = this.utils.deleteSubFun(data);
            this.funcionalityService.editSubFuncionality(payload).subscribe({
              next: (_) => {
                this.toastrService.info(
                  'Se elimino correctamente',
                  'Eliminando sub-f'
                );
                this.listado();
              },
              error: (err) =>
                this.toastrService.info(err.message, err.statusText),
            });
            break;
          }
          case COMPONENTES.ROL: {
            let payload = this.utils.deleteRole(data);

            this.securityService.editRole(payload).subscribe({
              next: (_) => {
                this.toastrService.info(
                  'Se elimino correctamente',
                  'Eliminando rol'
                );
                this.body_role = null;
                this.listRol();
              },
              error: (err) =>
                this.toastrService.info(err.message, err.statusText),
            });
            break;
          }
          case COMPONENTES.PERFIL: {
            let payload = this.utils.deleteprofile(data);
            this.securityService.editProfile(payload).subscribe({
              next: (_) => {
                // this.toastrService.info(_.message, 'Eliminando perfil');
                this.body_profile = null;
                this.listProfile();
              },
            });

            break;
          }
          // case COMPONENTES.PERMISSION: {
          //   this.securityService.deletePermission(payload).subscribe({
          //     next: (_) => {
          //       this.toastrService.info(
          //         'Se elimino correctamente',
          //         'Eliminando Permiso'
          //       );
          //       this.listPermiso();
          //     },
          //     error: (err) => {
          //       this.toastrService.info(err.message, err.statusText);
          //     },
          //   });
          //   break;
          // }
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
  manage(element: any, ind: any) {
    console.log(element);
    console.log(ind);
    // let inded = ind;
    this.showFunc = !this.showFunc;
    // this.show = !this.show;
    this.title_functionality = element.nombre_rol;
    // this.listFuncionality();
    let list = this.subs.toArray();
    // console.log(list[0].nativeElement.id);
    // console.log(list[1]);
    // console.log(list[ind].nativeElement)
    // console.log(this.showFunc);
    // setTimeout(() => {
    // if (ind) {
    if (this.showFunc) {
      // list[ind - 1].nativeElement.setAttribute('class', 'd-none');
      list[ind].nativeElement.classList.add(TEXTAPP.CLASS_DNONE);
    } else {
      list[ind].nativeElement.classList.remove(TEXTAPP.CLASS_DNONE);
      // list[ind - 1].nativeElement.removeAttribute('class');
    }

    // }
    // }, 1000);

    // console.log(this.perfiles);
  }
  // CHK FUNCIONALIDAD-PERMISOS
  updateAllCompleteP() {
    this.allComplete =
      this.chkFuncionalidades.functionalities != null &&
      this.chkFuncionalidades.functionalities.every((t: any) => t.checked);
  }
  someCompleteP(): boolean {
    if (this.chkFuncionalidades.functionalities == null) {
      return false;
    }
    return (
      this.chkFuncionalidades.functionalities.filter((t: any) => t.checked)
        .length > 0 && !this.allComplete
    );
  }
  setAllP(completed: boolean) {
    this.allComplete = completed;
    if (this.chkFuncionalidades.functionalities == null) {
      return;
    }
    this.chkFuncionalidades.functionalities.forEach(
      (t: any) => (t.checked = completed)
    );
  }
  updateAllCompleteR() {
    this.allComplete =
      this.chkPermissions.permissions != null &&
      this.chkPermissions.permissions.every((t) => t.checked);
  }
  someCompleteR(): boolean {
    if (this.chkPermissions.permissions == null) {
      return false;
    }
    return (
      this.chkPermissions.permissions.filter((t) => t.checked).length > 0 &&
      !this.allComplete
    );
  }
  setAllR(chkAll: boolean) {
    this.allComplete = chkAll;
    if (this.chkPermissions.permissions == null) {
      return;
    }
    this.chkPermissions.permissions.forEach((t) => (t.checked = chkAll));
  }
  update() {}
  openDialog(e?: string, body?: any | undefined): void {
    let componente: any = '';
    switch (e) {
      case COMPONENTES.FUNCIONALIDAD: {
        componente = FuncionalidadComponent;
        break;
      }
      case COMPONENTES.SUBFUNCIONALIDAD: {
        componente = SubfuncionalidadComponent;
        break;
      }
      case COMPONENTES.ROL: {
        componente = RolComponent;
        break;
      }
      case COMPONENTES.PERFIL: {
        componente = PerfilComponent;
        break;
      }
      case COMPONENTES.PERMISSION: {
        componente = PermisosComponent;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    const dialogRef = this.dialog.open(componente, {
      width: '500px',
      disableClose: true,
      data: body ? body : undefined,
    });

    dialogRef.afterClosed().subscribe((dataDialog: any) => {
      switch (e) {
        case COMPONENTES.FUNCIONALIDAD: {
          if (dataDialog) {
            if (dataDialog?.id_funcionalidad) {
              this.editFun(this.utils.mapperNewfunctionality(dataDialog));
            } else {
              this.createFun(this.utils.mapperNewfunctionality(dataDialog));
            }
          }
          break;
        }
        case COMPONENTES.SUBFUNCIONALIDAD: {
          if (dataDialog) {
            if (dataDialog?.id_subfuncionalidad) {
              this.editSubFun(this.utils.mapperNewSubfunctionality(dataDialog));
            } else {
              this.createSubFun(
                this.utils.mapperNewSubfunctionality(dataDialog)
              );
            }
          }
          break;
        }
        case COMPONENTES.PERFIL: {
          if (dataDialog) {
            if (dataDialog?.id_perfil) {
              this.editProfile(this.utils.mapperProfile(dataDialog));
            } else {
              this.createProfile(this.utils.mapperProfile(dataDialog));
            }
          }
          break;
        }
        // case COMPONENTES.PERMISSION: {
        //   if (dataDialog) {
        //     if (dataDialog?.id_permiso) {
        //       this.editPermiso(this.utils.mapperPermission(dataDialog));
        //     } else {
        //       this.createPermiso(this.utils.mapperPermission(dataDialog));
        //     }
        //   }
        //   break;
        // }
        case COMPONENTES.ROL: {
          if (dataDialog) {
            if (dataDialog?.id_rol) {
              this.editRol(this.utils.mapperRole(dataDialog));
            } else {
              this.createRol(this.utils.mapperRole(dataDialog));
            }
          }
          break;
        }
        default: {
          //statements;
          break;
        }
      }

      // if (dataDialog) {
      //   if (dataDialog?.id) {
      //     this.editFun(this.utils.mapperNewfunctionality(dataDialog,this.list_functionality.length));
      //   } else {
      //     this.createFun(this.utils.mapperNewfunctionality(dataDialog,this.list_functionality.length));
      //   }
      // }
    });
  }
  trackByFn(index: number, item: any) {
    return (
      item.id_perfil |
      item.id_funcionalidad |
      item.id_subfuncionalidad |
      item.id_rol
    );
  }
}
