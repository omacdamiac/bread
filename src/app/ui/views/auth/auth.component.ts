import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@data/services/auth/auth.service';
import { ButtonNsModel } from '@shared/components/button/model/button-ns.model';
import { InputNsModel } from '@shared/components/input/model/input-ns.model';
import { ROUTES_APP, TEXTAPP, TEXTAUTH } from '@shared/const';
import { IUSERSLOGIN } from '@core/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  inputUser = new InputNsModel.InputClass(
    'Usuario',
    'Ingresar usuario',
    true,
    'usuario',
    'text',
    true
  );
  inputPass = new InputNsModel.InputClass(
    'Contraseña',
    'Ingresar contraseña',
    true,
    'contrasena',
    'password'
  );
  btnIn = new ButtonNsModel.ButtonClass('Ingresar', 'primary', 'w-100 mx-0');
  title: string = TEXTAUTH.TITLE_AUTH;
  formAuth!: FormGroup;
  load: boolean;
  constructor(
    public router: Router,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    this.load = false;
  }

  get form() {
    return this.formAuth.value;
  }

  ngOnInit() {
    this.createForm();
    localStorage.clear();
  }
  createForm(): void {
    this.formAuth = new FormGroup({});
  }
  login(): void {
    if (this.formAuth.valid) {
      this.load = true;
      this.authService.login().subscribe((user: IUSERSLOGIN[]) => {
        let username = user.find((el: IUSERSLOGIN) => {
          return el.rol === this.form.usuario;
        });
        localStorage.setItem(TEXTAPP.TEXT_TOKEN, String(username?.token));
        this.router.navigate([ROUTES_APP.INICIO]);
      });
    } else {
      // this.load = true;
      this.formAuth.markAllAsTouched();
      this.toastrService.info(TEXTAUTH.TOAST_MESSAGE, TEXTAPP.TEXT_ZERO);
    }
  }

  @HostListener('body:keyup', ['$event'])
  loginEnter(event: any) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.login();
    }
  }
}
