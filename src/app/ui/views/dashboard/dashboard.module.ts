import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
  BreadcrumbsModule,
  ButtonModule,
  LoaderModule,
} from '@shared/components';
import { MaterialModule, SharedModule } from '../../../shared/library';
import { NavModule } from '@shared/components/nav/nav.module';
import {
  ConfiguracionModule,
  HomeModule,
  MonitoreoModule,
  ProcesosModule,
  ReportesModule,
  SeguridadModule,
} from '../../features';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from '@core/interceptors/interceptor.interceptor';
import {
  AssignService,
  AuditService,
  FuncionalityService,
  MonitoringService,
  ProcessesService,
  ReportsService,
  SecurityService,
} from '@data/services';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HomeModule,
    ProcesosModule,
    ReportesModule,
    MonitoreoModule,
    SeguridadModule,
    ConfiguracionModule,
    MaterialModule,
    SharedModule,
    BreadcrumbsModule,
    ButtonModule,
    NavModule,
    LoaderModule,
  ],
  providers: [
    AssignService,
    SecurityService,
    FuncionalityService,
    ProcessesService,
    ReportsService,
    MonitoringService,
    AuditService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
})
export class DashboardModule {}
