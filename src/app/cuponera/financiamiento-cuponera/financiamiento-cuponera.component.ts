import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Moment } from "moment";
import { CargarloteService } from "app/_services/cargarlote.service";
import { Producto } from "app/_models/producto.model";
import { Banco } from "app/_models/entidad.model";
import { NgForm } from "@angular/forms";
import { BuscarPlanilla } from "app/_models/cargarlote.model";
import { DatePipe } from "@angular/common";
import { DialogControl } from "app/conciliaciones/compartido/popupDialog.component";
import { ExcelService } from "app/_services/exportexcel.service";
import * as FileSaver from "file-saver";
import { User } from "app/_models/user.model";
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
  selector: "app-financiamiento-cuponera",
  templateUrl: "./financiamiento-cuponera.component.html",
  styleUrls: ["./financiamiento-cuponera.component.scss"],
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
export class FinanciamientoCuponeraComponent implements OnInit {
  public listaproductos: Producto[] = [];
  public listabancos: Banco[] = [];
  public idProducto: number;
  public idEntidadBancaria: number;
  public srcResult: any;
  public numRecibo: string;
  public key: string;
  public nroCuponera: number;
  public nroCupones: number;
  public cantCupones: number;
  public montoInicial: number;
  public importeTotal: number = 0;
  public cabRecibo: any = {};
  public listaplanilla: any[] = [];
  public fechaFin = new Date();
  public fileTrama: string;
  public ListaExcel: any[] = [];
  public ListTipoTransacion: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public fechaInicio = new Date();
  public fechaInicioDesde = new Date();
  maxDate = new Date();
  minDate = new Date();

  public trama = new Array<{
    numeroCuenta: number;
    nombreContratante: string;
    documento: string;
    codigoProforma: string;
    fechaVencimiento: string;
    fechaEmision: string;
    importe: string;
    importeMora: string;
    importeMontoMinimo: string;
  }>();
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private service: CargarloteService,
    private serviceExporta: ExcelService
  ) {}

  displayedColumnsTrama = [
    "Tipo Doc",
    "Ruc",
    "Contratante",
    "Cod. Proforma",
    "N° Recibo",
    "Fecha Emisión",
    "Fecha Vencimiento",
  ];

  dataSourceTrama = new MatTableDataSource();
  ngOnInit() {
    this.ListTipoTransacion = [
      { name: "Creación de Cuponera" },
      { name: "Recuperación de Cuponera" },
      { name: "Modificación de Cuponera" },
    ];
    this.service.listarProducto().subscribe(
      (s) => {
        this.listaproductos = s;
      },
      (e) => {
        console.log(e);
      }
    );
    this.service.listarBanco().subscribe(
      (s) => {
        this.listabancos = s;
      },
      (e) => {
        console.log(e);
      }
    );
  }
  onFileSelected(file: File) {
    this.srcResult = file.name;
  }
  onValidarBusqueda(myForm: NgForm) {
    if (myForm.valid) {
      const datePipe = new DatePipe("en-US");
      const fechaInicio = datePipe.transform(this.fechaInicio, "dd/MM/yyyy");
      const fechaFin = datePipe.transform(this.fechaFin, "dd/MM/yyyy");
      let date1 = new Date(fechaInicio);
      console.log(date1);
      console.log(fechaFin);
      let date2 = new Date(fechaFin);

      console.log(date2);
      if (this.fechaFin >= this.fechaInicio) {
        this.cargarTabla();
      } else {
        this.toastr.error("Rango de fechas inválido", "Gestión de Cobranzas");
      }
    } else {
      this.toastr.error(
        "Por favor completar todos los campos",
        "Gestión de Cobranzas"
      );
    }
  }

  onExportarExcel() {
    console.log(this.listaplanilla);
    if (this.listaplanilla.length > 0) {
      this.serviceExporta.exportAsExcelFile(
        this.listaplanilla,
        "Gestión de Cobranzas"
      );
    } else {
      this.toastr.warning("No hay datos para exportar", "Gestión de Cobranzas");
    }
  }

  onGenerarTrama() {
    if (this.fileTrama) {
      var file = new File(
        [this.obtenerBlobFromBase64(this.fileTrama, "")],
        "TramaEnvio.txt",
        { type: "text/plain;charset=utf-8" }
      );
      FileSaver.saveAs(file);
    } else {
      this.toastr.warning(
        "No se pudo generar la trama",
        "Gestión de Cobranzas"
      );
    }
  }

  obtenerBlobFromBase64(b64Data: string, contentType: string) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  onCambiarCampo() {
    this.listaplanilla = [];
    this.fileTrama = "";
  }
  cargarTabla() {
    var usercode = localStorage.getItem("currentUser");
    let jsonObj: any = JSON.parse(usercode); // string to generic object first
    let user: User = <User>jsonObj;

    const dialogRefLoad = this.dialog.open(DialogControl, {
      width: "300px",
      data: { tipoDialogo: "Load" },
    });
    let buscarPlanilla: BuscarPlanilla = new BuscarPlanilla();
    var datePipe = new DatePipe("en-US");
    buscarPlanilla.IdBanco = this.idEntidadBancaria;
    buscarPlanilla.IdProducto = this.idProducto;
    buscarPlanilla.FechaInicial = datePipe.transform(
      this.fechaInicio,
      "dd/MM/yyyy"
    );
    buscarPlanilla.FechaFinal = datePipe.transform(this.fechaFin, "dd/MM/yyyy");
    buscarPlanilla.CodigoUsuario = user.id;
    this.service.obtenerTrama(buscarPlanilla).subscribe(
      (s) => {
        if (s.resultado) {
          console.log(s.listaProforma);
          this.listaplanilla = s.listaProforma;
          this.dataSourceTrama.data = s.listaProforma;
          this.dataSourceTrama.paginator = this.paginator;
          this.fileTrama = s.rutaTrama;
        } else {
          this.toastr.error(s.mensajeError, "Gestión de Cobranzas");
        }
        setTimeout(() => {
          dialogRefLoad.close();
        }, 500);
      },
      (e) => {
        dialogRefLoad.close();
        console.log(e);
      }
    );
  }
}
