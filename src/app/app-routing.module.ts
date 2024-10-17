import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TEXTAPP } from '@shared/const';
import { ROUTING } from './shared/const/routing.contanst';

const routes: Routes = [
  {
    path: TEXTAPP.TEXT_ZERO,
    redirectTo: ROUTING.ROUTER_LOGIN,
    pathMatch: ROUTING.PATH_MATCH,
  },
  {
    path: ROUTING.ROUTER_LOGIN,
    loadChildren: () =>
      import('./ui/views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: TEXTAPP.TEXT_ZERO,
    loadChildren: () =>
      import('./ui/views/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
