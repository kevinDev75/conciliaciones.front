import { Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const MantenimientosRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'perfiles',
      component: PerfilesComponent
    }, {
      path: 'usuarios',
      component: UsuariosComponent
    }]
  }
]
