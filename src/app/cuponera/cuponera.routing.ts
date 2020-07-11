import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CuponeraTratamientoComponent } from "./cuponera-tratamiento/cuponera-tratamiento.component";
import { ImpresionComponent } from "./impresion/impresion.component";
import { FinanciamientoCuponeraComponent } from "./financiamiento-cuponera/financiamiento-cuponera.component";
export const CuponeraRoutingModule: Routes = [
  {
    path: "",
    children: [
      {
        path: "CuponeraTratamiento",
        component: CuponeraTratamientoComponent,
      },
      {
        path: "Impresion",
        component: ImpresionComponent,
      },
      {
        path: "CuponeraFinanciamiento",
        component: FinanciamientoCuponeraComponent,
      },
    ],
  },
];
