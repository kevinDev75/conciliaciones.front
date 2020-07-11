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
import { GenerarTramaComponent } from './generartrama/generartrama.component';
import { CargarLoteComponent } from './cargarlote/cargarlote.component';
import { CobranzasRoutes } from './cobranzas.routing';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
//import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CobranzasRoutes),
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
    DemoMaterialModule
  ],
  declarations: [
    GenerarTramaComponent, CargarLoteComponent ]
})
export class CobranzasModule { }
