import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TEXTAPP } from '@shared/const';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  hide: boolean;
  title: string = TEXTAPP.TITLE_DASHBOARD;
  user: string;
  data: any;
  userCircle!: string;
  constructor(private router: Router) {
    this.hide = true;
    this.user = TEXTAPP.TEXT_ZERO;
  }

  ngOnInit() {
    if (localStorage.getItem(TEXTAPP.TEXT_TOKEN)) {
      this.setMenu();
      this.user = this.data.nombre;
    } else {
      this.router.navigate([TEXTAPP.TEXT_BARRA]);
    }
    this.setCharacters();
    this.setUsername(this.data.usuario)
  }

  setCharacters() {
    let arr = this.user.split(' ');
    let initial = arr[0].substr(0, 1);
    let initialTwo = arr[1].substr(0, 1);
    this.userCircle = initial.toLocaleUpperCase() + initialTwo.toLocaleUpperCase();
  }

  toggleActiveMenu(): void {
    this.hide = !this.hide;
  }

  private setMenu() {
    let token = localStorage.getItem(TEXTAPP.TEXT_TOKEN);
    let decoded = jwtDecode(String(token));    
    this.data = decoded;
  }
  private setUsername (user: any) {
    localStorage.setItem('username', user)
  }
}
