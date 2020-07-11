import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
//import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from 'app/_guards/auth.guard';
//import { AppComponent } from './app.component';
import { LoginComponent } from 'app/login/login/login.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'home',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
      path: 'apps',
      loadChildren: './apps/apps.module#AppsModule'
    }, {
      path: 'features',
      loadChildren: './features/features.module#FeaturesModule'
    }, {
      path: 'material',
      loadChildren: './material/material.module#MaterialComponentsModule'
    }, {
      path: 'icons',
      loadChildren: './icons/icons.module#IconsModule'
    }, {
      path: 'forms',
      loadChildren: './forms/forms.module#FormModule'
    }, {
      path: 'tables',
      loadChildren: './tables/tables.module#TablesModule'
    }, {
      path: 'mantenimientos',
      loadChildren: './mantenimientos/mantenimientos.module#MantenimientosModule'
    }, {
      path: 'conciliaciones',
      loadChildren: './conciliaciones/conciliaciones.module#ConciliacionesModule'
    }, {
      path: 'generacionprocesos',
      loadChildren: './generacionprocesos/generacionexactus.module#GeneracionExactusModule'
    },{
      path: 'generacionarchivos',
      loadChildren: './generacionarchivos/generacionarchivos.module#GeneracionarchivosModule'
    }, {
      path: 'reportes',
      loadChildren: './reportes/reportes.module#ReportesModule'
    }, {
      path: 'abonospendientes',
      loadChildren: './abonospendientes/documentoabono.module#DocumentoAbonoModule'
    }, {
      path: 'maps',
      loadChildren: './maps/maps.module#MapModule'
    }, {
      path: 'cards',
      loadChildren: './cards/cards.module#CardsDemoModule'
    }, {
      path: 'pages',
      loadChildren: './custom-pages/pages.module#PagesDemoModule'
    }, {
      path: 'user-pages',
      loadChildren: './user-pages/users.module#UsersModule'
    }, {
      path: 'gallery',
      loadChildren: './gallery/gallery.module#GalleryDemoModule'
    }, {
      path: 'ecommerce',
      loadChildren: './ecommerce/ecommerce.module#EcommerceDemoModule'
    },{
      path: 'cobranzas',
      loadChildren: './cobranzas/cobranzas.module#CobranzasModule'
    },
{
        path: "cuponera",
        loadChildren: "./cuponera/cuponera.module#CuponeraModule",
      }]
  }, {
    path: '**',
    redirectTo: 'session/404'
  }

];
