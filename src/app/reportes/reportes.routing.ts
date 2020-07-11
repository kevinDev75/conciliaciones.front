import { Routes } from '@angular/router';
import { ConciliaionesPendientesComponent } from './reporteconciliacionespendientes/conciliacionespendientes.component';

export const ReportesRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'reporteconciliacionespendientes',
        component: ConciliaionesPendientesComponent
      }
    ]
  }
]
