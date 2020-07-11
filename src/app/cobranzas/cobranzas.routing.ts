import { Routes } from '@angular/router'; 
import { CargarLoteComponent } from './cargarlote/cargarlote.component';
import { GenerarTramaComponent  } from './generartrama/generartrama.component';


export const CobranzasRoutes: Routes = [{
    path: '',
    children: [{
        path: 'cargarlote',
        component: CargarLoteComponent
    },
    {
        path: 'generartrama',
        component: GenerarTramaComponent
    }
	]
}];
