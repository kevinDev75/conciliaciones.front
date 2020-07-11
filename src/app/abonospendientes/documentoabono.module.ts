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
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { DocumentoAbonoComponent } from './documentoabono/documentoabono.component';
import { DocumentoAbonoRoutes } from './documentoabono.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocumentoAbonoRoutes),
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
    DocumentoAbonoComponent
  ],
  providers: [ToastrService]
})

export class DocumentoAbonoModule {}





