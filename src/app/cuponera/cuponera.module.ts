import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DemoMaterialModule } from "../shared/demo.module";
import { FormsModule } from "@angular/forms";
import { CuponeraRoutingModule } from "./cuponera.routing";
import { CuponeraTratamientoComponent } from "./cuponera-tratamiento/cuponera-tratamiento.component";
import { ImpresionComponent } from "./impresion/impresion.component";
import { FinanciamientoCuponeraComponent } from "./financiamiento-cuponera/financiamiento-cuponera.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CuponeraRoutingModule),
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
  ],
  declarations: [
    CuponeraTratamientoComponent,
    ImpresionComponent,
    FinanciamientoCuponeraComponent,
  ],
})
export class CuponeraModule {}
