import { Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ConciliacionAutomaticaComponent } from './conciliacionautomatica/conciliacionautomatica.component';
import { PlanillasImportadasComponent } from './planillasimportadas/planillasimportadas.component';
import { PlanillasProcesadasComponent } from './planillasprocesadas/planillasprocesadas.component';
import { ConciliacionManualComponent } from './conciliacionmanual/conciliacionmanual.component';

export const ConciliacionesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'conciliacionautomatica',
        component: ConciliacionAutomaticaComponent
    },
    {
        path: 'planillasimportadas',
        component: PlanillasImportadasComponent
    },
    {
        path: 'planillasprocesadas',
        component: PlanillasProcesadasComponent
    },
    {
      path: 'conciliacionmanual',
      component: ConciliacionManualComponent
    }
	]
}];
