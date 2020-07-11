import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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

import { GeneracionExactusRoutes } from './generacionexactus.routing';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { GeneracionExactusComponent } from './generacionexactus/generacionexactus.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GeneracionExactusRoutes),
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    DemoMaterialModule
  ],
  declarations: [
    GeneracionExactusComponent
  ]
})

export class GeneracionExactusModule {}
