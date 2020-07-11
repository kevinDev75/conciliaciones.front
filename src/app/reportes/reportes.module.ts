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
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReportesRoutes } from './reportes.routing';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';
import { ConciliaionesPendientesComponent } from './reporteconciliacionespendientes/conciliacionespendientes.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportesRoutes),
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
    DataTablesModule,
    NgxSpinnerModule
  ],
  declarations: [ConciliaionesPendientesComponent],
  providers: [ToastrService]
})
export class ReportesModule {}
