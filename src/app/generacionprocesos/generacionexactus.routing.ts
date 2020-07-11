import { Routes } from '@angular/router';
import { PlanillasImportadasComponent } from '../conciliaciones/planillasimportadas/planillasimportadas.component';
import { ConciliacionAutomaticaComponent } from '../conciliaciones/conciliacionautomatica/conciliacionautomatica.component';
import { GeneracionExactusComponent } from './generacionexactus/generacionexactus.component';

export const GeneracionExactusRoutes : Routes = [
  {  path: '',
  component: GeneracionExactusComponent
  }
]