import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MantenimientosRoutes } from './mantenimientos.routing'
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaPerfilesComponent } from './lista-perfiles/lista-perfiles.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MantenimientosRoutes),
    FormsModule,
    NgxDatatableModule,
    MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  FlexLayoutModule,
  DemoMaterialModule,
  DataTablesModule
  ],
  declarations: [
    PerfilesComponent,
    UsuariosComponent,
    ListaPerfilesComponent
  ],
  providers: [ToastrService]
})

export class MantenimientosModule {}


