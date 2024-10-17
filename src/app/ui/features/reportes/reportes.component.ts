import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  title: string;
  public subscriber!: Subscription;

  constructor(public router: Router) {
    this.title = 'Reportes';
  }

  ngOnInit(): void {
    this.subscriber = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('The URL changed to: ' + event['url']);
      });

      // this.router.events.subscribe((ev)=> console.log(ev))
  }

  ngOnDestroy () {
    this.subscriber?.unsubscribe();
 }
}
