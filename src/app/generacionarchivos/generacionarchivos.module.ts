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
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { GeneracionarchivosRoutes } from './generacionarchivos.routings';
import { GeneracionarchivosComponent } from './generacionarchivos.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GeneracionarchivosRoutes),
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    DemoMaterialModule,
    NgxSpinnerModule
  ],
  declarations: [
    GeneracionarchivosComponent
  ]
})
export class GeneracionarchivosModule { }
