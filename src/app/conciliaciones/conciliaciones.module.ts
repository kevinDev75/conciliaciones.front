import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule } from '@angular/material';
  import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConciliacionAutomaticaComponent } from './conciliacionautomatica/conciliacionautomatica.component';
import { ConciliacionesRoutes } from './conciliaciones.routing';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { PlanillasImportadasComponent } from './planillasimportadas/planillasimportadas.component';
import { PlanillasProcesadasComponent } from './planillasprocesadas/planillasprocesadas.component';
import { ConciliacionManualComponent } from './conciliacionmanual/conciliacionmanual.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConciliacionesRoutes),
    FormsModule,
    //CustomFormsModule,
    //ReactiveFormsModule,    
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    //HttpModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    DemoMaterialModule,
    NgxSpinnerModule
  ],
  declarations: [
    ConciliacionAutomaticaComponent, PlanillasImportadasComponent, PlanillasProcesadasComponent, ConciliacionManualComponent]
})
export class ConciliacionesModule { }
