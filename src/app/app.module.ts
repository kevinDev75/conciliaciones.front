import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from './shared/demo.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material'
import { MatTreeModule } from '@angular/material/tree';

import { JazzDialogComponent } from './material/dialog/dialog.component';
import { CalendarDialogComponent } from './apps/fullcalendar/fullcalendar.component';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';

import { MaterialComponentsModule } from './material/material.module';

import { LoginComponent } from './login/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { GeneracionExactusModule } from './generacionprocesos/generacionexactus.module';

import { DialogControl } from './conciliaciones/compartido/popupDialog.component';
import { DataTablesModule } from 'angular-datatables';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DialogPerfilComponent } from './mantenimientos/dialog-perfil/dialog-perfil.component';
import { DialogUsuariosPerfilComponent } from './mantenimientos/dialog-usuarios-perfil/dialog-usuarios-perfil.component';
import { DialogUsuarioComponent } from './mantenimientos/dialog-usuario/dialog-usuario.component';
import { GeneracionExactusService } from './_services/generacionexactus.service';
import { GeneracionFacturaComponent } from './abonospendientes/generacionfactura/generacionfactura.component';
import { GeneracionarchivosModule } from './generacionarchivos/generacionarchivos.module';
import { DialogControlPago } from './cobranzas/cargarlote/dialog-formapago/compartido/popupDialog.component';
import { DialogFormaPago } from './cobranzas/cargarlote/dialog-formapago/dialogformapago.component';
import { FechasPipe } from './_pipes/fechas.pipe';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    JazzDialogComponent,
    CalendarDialogComponent,
    LoginComponent,
    DialogErrorComponent,
    DialogConfirmComponent,
    DialogControl,
    DialogPerfilComponent,
    DialogUsuariosPerfilComponent,
    DialogUsuarioComponent,
    GeneracionFacturaComponent,
    DialogFormaPago,
    DialogControlPago,
    FechasPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCardModule,
    DemoMaterialModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    FlexLayoutModule,
    MantenimientosModule,
    GeneracionExactusModule,
    GeneracionarchivosModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    MaterialComponentsModule,
    MatDialogModule,
    MatTreeModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  /*providers: [
    {
      provide: [PERFECT_SCROLLBAR_CONFIG,
                AuthGuard,
                AlertService,
                AuthenticationService,
                UserService,
                AppConfig,
                PlanillasImportadasService,
                PlanillasProcesadasService,
                ConciliacionManualService,
                GeneracionExactusService],
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ],*/
  // tslint:disable-next-line:max-line-length
  entryComponents: [JazzDialogComponent, CalendarDialogComponent, DialogErrorComponent, DialogControl, DialogPerfilComponent, DialogUsuariosPerfilComponent, DialogUsuarioComponent, DialogConfirmComponent, GeneracionFacturaComponent, DialogFormaPago, DialogControlPago],
  bootstrap: [AppComponent]
})
export class AppModule { }
