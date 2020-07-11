import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import { NgForm } from '@angular/forms';
import { CuponeraService } from 'app/_services/cuponera.service';
import { ParametersRecibo, Transaciones } from 'app/_models/Cuponera.model';
import { DatePipe } from '@angular/common';
import { DialogControl } from 'app/conciliaciones/compartido/popupDialog.component';
import { ExcelService } from 'app/_services/exportexcel.service';
import * as FileSaver from 'file-saver';
import { User } from 'app/_models/user.model';
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
  selector: "app-cuponera-tratamiento",
  templateUrl: "./cuponera-tratamiento.component.html",
  styleUrls: ["./cuponera-tratamiento.component.scss"],
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
export class CuponeraTratamientoComponent implements OnInit {
  public listTipoTransacion: Transaciones[] = [];
  public numRecibo: string;
  public key: string;
  public nroCuponera: number;
  public nroCupones: number;
  public cantCupones: number;
  public montoInicial: number;
  public importeTotal: number = 0;
  public cabRecibo: any = {};
  public idProducto: number;
  public idEntidadBancaria: number;
  public srcResult: any;
  public listaplanilla: any[] = [];
  public fechaFin = new Date();
  public fileTrama: string;
  public ListaExcel: any[] = [];
  public idTransacion: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public fechaInicio = new Date();
  public fechaInicioDesde = new Date();
  datePipe = new DatePipe('en-US');
  maxDate = new Date();
  minDate = new Date();
  dataSourceCuponera = new MatTableDataSource();

  public ListCupon = new Array<{
    skey: string,
    nrocuponera: string,
    nroCupon: string,
    mroRecibo: string,
    fechaDesde: string,
    fechaHasta: string,
    fechaPago: number,
    montoCupon: string,
  }>();
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private service: CuponeraService,
    private serviceExporta: ExcelService,
  ) { }

  displayedColumnsCupon = [
    'Cupon',
    'N° de Cupon',
    'Fecha inicio vigencia',
    'Fecha fin vigencia',
    'Fecha de Pago',
    'Monto de Cupón',
    'Estado',
  ];

  ngOnInit() {

    this.service.ListarTransaciones().subscribe(

      (s) => {
        this.listTipoTransacion = s;
        console.log(this.listTipoTransacion);
      },
      (e) => {
        console.log(e);
      }
    );

  }


  btnGrabar(form: any) {
    if (this.idTransacion === 1) {
      this.onCreateCupon();
    }
    if (this.idTransacion === 3) {
      this.onAnularCupon();
    }

  }

  onAnularCupon() {

    const params: ParametersRecibo = new ParametersRecibo();
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    const user: User = <User>jsonObj;
    params.idTransacion = this.idTransacion;
    params.NroCuponera = this.nroCuponera;
    params.NroRecibo = String((this.numRecibo == '' ? 0 : this.numRecibo));
    params.UserCode = user.id;
    params.Key = this.key;
    this.service.AnularCupon(params).subscribe(
      s => {
        console.log(s);
        if (s.p_NCODE === 0) {
          this.toastr.success('Se anulo correctamente el cupon');
        } else {
          this.toastr.error('Hubieron problemas al eliminar el cupon', 'Gestion de Cuponera');
        }

      },
      e => {
        this.toastr.error('Hubieron problemas al eliminar el cupon', 'Gestion de Cuponera');
      }
    );
  }


  onCreateCupon() {

    const params: ParametersRecibo = new ParametersRecibo();
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    const user: User = <User>jsonObj;
    params.idTransacion = this.idTransacion;
    params.NroRecibo = String(this.numRecibo);
    params.UserCode = user.id;
    params.Key = this.key;
    this.service.GenerarCupon(params).subscribe(
      s => {
        console.log(s);
        if (s.p_NCODE === 0) {
          this.toastr.success('Se genero correctamente el cupon N° ' + String(s.data), 'Gestion de Cuponera');
        } else {
          this.toastr.error('Hubieron problemas al generar el cupon', 'Gestion de Cuponera');
        }

      },
      e => {
        this.toastr.error('Hubieron problemas al generar el cupon', 'Gestion de Cuponera');
      }
    );
  }

  onGetUser() {
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    return <User>jsonObj;
  }
  onObtenerInfoCuponCab() {
    const params: ParametersRecibo = new ParametersRecibo();
    const user: User = this.onGetUser();
    params.NroCuponera = this.nroCuponera;
    params.NroRecibo = String(this.numRecibo);
    params.UserCode = user.id;

    this.service.ObtenerInfoCupon(params).subscribe(
      s => {
        console.log(s);
        if (s.p_NCODE === 0) {
          this.cabRecibo = s;
          this.service.ObtenerInfoCuponDetail(params).subscribe(
            d => {
              console.log(d);
              if (d.length > 0) {
                this.FillData(d);
                this.dataSourceCuponera.data = this.ListCupon;
              }

            },
            e => {
              this.toastr.error('Hubieron problemas al obtener el detalle de la cuponera', 'Gestión de cuponera');
            }
          );
        } else {
          this.toastr.warning(s.p_SMESSAGE, 'Gestión de cuponera');
        }

      },
      e => {
        this.toastr.error('Hubieron problemas al buscar el cupon', 'Gestión de cuponera');
      }
    );
  }
  btnProcesar(form: any) {
    if (this.idTransacion === 1) {
      this.onProcesarInfoPreview();
    } else if (this.idTransacion === 2) {
      this.onObtenerInfoCuponCab();
    } else if (this.idTransacion === 3) {
      this.onObtenerInfoCuponCab();
    }


  }
  FillData(listado: any[]) {
    this.ListCupon = [];
    let sumaImporte: number;
    const datePipe = new DatePipe('en-US');
    listado.forEach(e => {
      this.key = e.skey;
      sumaImporte = sumaImporte + Number(e.montoCupon);
      e.select = 0;
      this.ListCupon.push(e);
    });
    this.importeTotal = sumaImporte;
  }

  ClearForm() {

    this.ListCupon = [];
    this.nroCuponera = 0;
    this.nroCupones = 0;
    this.numRecibo = '';
    this.dataSourceCuponera.data = this.ListCupon;
    this.cabRecibo = {};
  }


  onProcesarInfoPreview() {
    const params: ParametersRecibo = new ParametersRecibo();
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    const user: User = <User>jsonObj;
    params.idTransacion = this.idTransacion;
    params.NroRecibo = String(this.numRecibo);
    params.UserCode = user.id;
    params.NroCupones = this.nroCupones;
    params.MontoInicial = 0;
    params.Monto = this.cabRecibo.montoPrima;
    this.service.ObtenerPreviewCupon(params).subscribe(
      s => {
        console.log(s);
        if (s.length > 0) {
          this.FillData(s);
          this.dataSourceCuponera.data = this.ListCupon;
        }

      },
      e => {
        this.toastr.error('Hubieron problemas para generar la Factura', 'Generar Fectura');
      }
    );

  }
  btningresar(form: any) {
    if (this.idTransacion === 1) {
      this.onBuscarInfoComprobante();
    }
  }
  onBuscarInfoComprobante() {
    const params: ParametersRecibo = new ParametersRecibo();
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    const user: User = <User>jsonObj;
    params.idTransacion = this.idTransacion;
    params.NroRecibo = String(this.numRecibo);
    params.UserCode = user.id;

    this.service.ObtenerIfoRecibo(params).subscribe(
      s => {
        console.log(s);
        if (s.p_NCODE === 0) {
          this.cabRecibo = s;
        } else {
          this.toastr.warning(s.p_SMESSAGE, 'Gestión de cuponera');
        }

      },
      e => {
        this.toastr.error('Hubieron problemas al buscar el recibo', 'Gestión de cuponera');
      }
    );
  }
  documentNumberKeyPress(event: any) {
    const CaracterNot: string[] = ['-', '+'];
    const inputChar = String.fromCharCode(event.charCode);
    if (CaracterNot.some(x => x === inputChar)) {
      event.preventDefault();
    }

  }

  onFileSelected(file: File) {
    this.srcResult = file.name;
  }



}
