import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  Injectable,
} from "@angular/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

import { FormControl } from "@angular/forms";
import { DialogControl } from "../../conciliaciones/compartido/popupDialog.component";

import { ExcelService } from "../../_services/exportexcel.service";
import { NgxSpinnerService } from "ngx-spinner";
export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: "app-impresion",
  templateUrl: "./impresion.component.html",
  styleUrls: ["./impresion.component.scss"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "es-PE" },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ImpresionComponent implements OnInit {
  public idProductoSeleccionado = 0;
  public fechaDesdeSeleccionado = "";
  public fechaHastaSeleccionado = "";

  public tipoDialogoLoad = "Load";
  public isRequired = true;
  public isRequiredFi = true;
  date = new FormControl(new Date());

  // tslint:disable-next-line:max-line-length
  // displayedColumnsPlanilla = ['idPlanilla', 'fechaPlanilla', 'totalPlanilla', 'numeroOperacion', 'idDeposito', 'fechaDeposito', 'totalDeposito'];
  // dataSourcePlanilla = new MatTableDataSource<PlanillasProcesadasResultado>(this.listaplanillasprocesadas);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: string;
  public ColorButton: string;

  constructor() {}

  ngOnInit() {}

  enabledButtonProceso() {
    if (this.idProductoSeleccionado === 0) {
      this.ColorButton = "white";
    } else {
      this.ColorButton = "purple";
    }
    this.ColorButton = "purple";
    return this.idProductoSeleccionado === 1;
  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {}

    const errMsg = error.errorMessage
      ? error.errorMessage
      : error.message
      ? error.message
      : error._body
      ? error._body
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "unknown server error";

    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
