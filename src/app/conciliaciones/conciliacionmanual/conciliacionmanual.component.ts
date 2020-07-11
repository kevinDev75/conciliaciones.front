import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Producto } from '../../_models/producto.model';
import { Banco, Cuenta } from '../../_models/entidad.model';
import { Moneda } from '../../_models/moneda.model';
import { Canal } from '../../_models/canal.model';

// tslint:disable-next-line:max-line-length
import {
  ConciliacionManualPlanillas,
  ConciliacionManualDepositos,
  DatosConsultarPlanilla,
  DatosConsultarDeposito,
  DatosAplicacionManual,
  DatosConsultarDepositoExt,
  ConciliacionManualDepositosExtornos
} from '../../_models/conciliacionmanual.model';
import { ConciliacionManualService } from '../../_services/conciliacionmanual.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import { DialogControl } from '../../conciliaciones/compartido/popupDialog.component';
import { CanalesService } from '../../_services/canal.service';
import { UtilityService } from 'app/_services/general/utility.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-conciliacionmanual',
  templateUrl: './conciliacionmanual.component.html',
  styleUrls: ['./conciliacionmanual.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ConciliacionManualComponent implements OnInit {
  // public listaplanillas: any[] = [];
  public listaplanillas: ConciliacionManualPlanillas[];
  public listadepositos: any[] = [];
  public listaDepositoExtornos: any[] = [];
  public listabancos: Banco[] = [];
  public listaproductos: Producto[] = [];
  public listamoneda: Moneda[] = [];
  public listacuenta: Cuenta[] = [];
  public listacanal: Canal[] = [];
  // Iteraccion
  public idBancoSeleccionado = -1;
  public idCuentaSeleccionado = 0;
  public idMonedaSeleccionado = 0;
  public idProductoSeleccionado = 0;
  public idCanalSeleccionado = -1;
  public fechaDesdeSeleccionado = '';
  public fechaHastaSeleccionado = '';
  public idPlanillaFiltro = '';
  public respuestaOkCancelDialog = '';
  // Constantes
  public respuestaOk = 'Ok';
  public respuestaCancel = 'Cancel';
  public tipoDialogoConfirmar = 'Confirmar';
  public tipoDialogoLoad = 'Load';
  public tipoDialogoMensaje = 'Mensaje';
  public isRequired = true;
  public ColorButton: string;
  public flagExtornos: boolean = false;
  isDisabled = true;
  // Grillas
  displayedColumnsPlanilla = [
    'select',
    'codigoCanal',
    'descripcionCanal',
    'idPlanilla',
    'dtFechaPlanilla',
    'dcTotal'
  ];
  displayedColumnsDeposito = [
    'select',
    'idDeposito',
    'fechaDeposito',
    'monto',
    'numeroOperacion',
    'extorno'
  ];
  displayedColumnsDepositoExtornos = [
    'select',
    'IdDeposito',
    'FechaDeposito',
    'Monto',
    'NumeroOperacion',
    'Saldo',
    'IdDepositoAsociado'
  ];
  dataSourcePlanilla = new MatTableDataSource<ConciliacionManualPlanillas>(
    this.listaplanillas
  );
  dataSourceDeposito = new MatTableDataSource<ConciliacionManualDepositos>(
    this.listadepositos
  );
  dataSourceDepositoExtornos = new MatTableDataSource<
    ConciliacionManualDepositosExtornos
  >(this.listaDepositoExtornos);
  selectionPlanilla = new SelectionModel<ConciliacionManualPlanillas>(true, []);
  selectionDeposito = new SelectionModel<ConciliacionManualDepositos>(true, []);
  selectionDepositoExtornos = new SelectionModel<
    ConciliacionManualDepositosExtornos
  >(true, []);
  @ViewChild('paginatorPlanilla') paginatorPlanilla: MatPaginator;
  @ViewChild('paginatorDeposito') paginatorDeposito: MatPaginator;
  @ViewChild('paginatorDepositoExtorno') paginatorDepositoExtorno: MatPaginator;
  public mensaje = '';

  constructor(
    private service: ConciliacionManualService,
    private canalservice: CanalesService,
    public dialog: MatDialog,
    public utilityService: UtilityService,
    private spinner: NgxSpinnerService
  ) {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionPlanilla.selected.length;
    const numRows = this.dataSourcePlanilla.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selectionPlanilla.clear()
      : this.dataSourcePlanilla.data.forEach(row =>
          this.selectionPlanilla.select(row)
        );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedDeposito() {
    const numSelectedDeposito = this.selectionDeposito.selected.length;
    const numRowsDeposito = this.dataSourceDeposito.data.length;
    return numSelectedDeposito === numRowsDeposito;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleDeposito() {
    this.isAllSelectedDeposito()
      ? this.selectionDeposito.clear()
      : this.dataSourceDeposito.data.forEach(row =>
          this.selectionDeposito.select(row)
        );
  }

  pintar(element) {
    //  console.log(element);
    //  const obj = new ConciliacionManualDepositos();
    //  obj.idDeposito = element.idDeposito;
    this.selectionDeposito.toggle(element);
    console.log(this.selectionDeposito);
  }

  checkDeposito(checked: boolean, idDeposito, numeroOperacion, extorno) {
    console.log('extorno' + extorno);
    // console.log(checked + ' / idDeposito:' + idDeposito  +' / numeroOperacion'+ numeroOperacion);
    if (checked && extorno !== '') {
      const datosConsultarDepositoExt = new DatosConsultarDepositoExt();
      datosConsultarDepositoExt.IdDeposito = idDeposito;
      datosConsultarDepositoExt.NumeroOperacion = numeroOperacion;
      this.service
        .consultarDepositoExtornados(datosConsultarDepositoExt)
        .subscribe(
          s => {
            this.listaDepositoExtornos =
              this.listaDepositoExtornos.length === 0
                ? s
                : this.listaDepositoExtornos.concat(s);
            this.flagExtornos =
              this.listaDepositoExtornos.length > 0 ? true : false;
            console.log(this.listaDepositoExtornos);
            this.dataSourceDepositoExtornos = new MatTableDataSource<
              ConciliacionManualDepositosExtornos
            >(this.listaDepositoExtornos);
            this.dataSourceDepositoExtornos.paginator = this.paginatorDepositoExtorno;

            console.log(this.selectionDeposito);
          },
          e => {
            console.log(e);
          }
        );
    } else {
      const index = this.listaDepositoExtornos.findIndex(
        item => item.idDepositoAsociado === idDeposito
      );
      if (index > -1) {
        this.listaDepositoExtornos.splice(index, 1);
      }
      this.dataSourceDepositoExtornos = new MatTableDataSource<
        ConciliacionManualDepositosExtornos
      >(this.listaDepositoExtornos);
      // this.flagExtornos = false;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedDepositoExtornos() {
    const numSelectedDepositoExtornos = this.selectionDepositoExtornos.selected
      .length;
    const numRowsDepositoExtornos = this.dataSourceDepositoExtornos.data.length;
    return numSelectedDepositoExtornos === numRowsDepositoExtornos;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleDepositoExtornos() {
    this.isAllSelectedDepositoExtornos()
      ? this.selectionDepositoExtornos.clear()
      : this.dataSourceDepositoExtornos.data.forEach(row =>
          this.selectionDepositoExtornos.select(row)
        );
  }

  ngOnInit() {
    this.service.listarProducto().subscribe(
      s => {
        this.listaproductos = s;
        this.idProductoSeleccionado = this.listaproductos[0].idProducto;
      },
      e => {
        console.log(e);
      }
    );

    this.service.listarBanco(true).subscribe(
      s => {
        this.listabancos = s;
        this.idBancoSeleccionado = 0;
        this.onConsultarCuentas();
      },
      e => {
        console.log(e);
      }
    );

    this.service.listarMoneda().subscribe(
      s => {
        this.listamoneda = s;
      },
      e => {
        console.log(e);
      }
    );

    this.canalservice.listarCanal().subscribe(
      s => {
        this.listacanal = s;
        this.idCanalSeleccionado = this.listacanal[0].idCanal;
      },
      e => {
        console.log(e);
      }
    );

    this.dataSourcePlanilla.paginator = this.paginatorPlanilla;
    this.dataSourceDeposito.paginator = this.paginatorDeposito;
    this.dataSourceDepositoExtornos.paginator = this.paginatorDepositoExtorno;
  }

  onConsultarCuentas() {
    this.service.listarCuentaxBanco(this.idBancoSeleccionado).subscribe(
      s => {
        this.listacuenta = s;
      },
      e => {
        console.log(e);
      }
    );
  }
  /*
    onConsultarCuentaSeleccionada() {
      this.service.listarCuentaxBanco(this.idBancoSeleccionado).subscribe(
          s => { console.log(s); this.listacuenta = s },
          e => { console.log(e); });
    }*/

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogControl, {
      width: '300px',
      data: {
        tipoDialogo: this.tipoDialogoConfirmar,
        respuestaOkCancelDialog: this.respuestaOkCancelDialog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //console.log(result);
      if (result != null) {
        this.respuestaOkCancelDialog = result.respuestaOkCancelDialog;
        if (this.respuestaOkCancelDialog === this.respuestaOk) {
          //console.log('Liquidar..');
          this.onLiquidar();
        }
      }
    });
  }

  onFiltrar() {
    this.dataSourceDepositoExtornos = null;
    this.listaDepositoExtornos = [];
    this.flagExtornos = false;

    const dialogRefLoad = this.dialog.open(DialogControl, {
      width: '300px',
      data: { tipoDialogo: this.tipoDialogoLoad }
    });

    const datosConsultarDeposito = new DatosConsultarDeposito();
    datosConsultarDeposito.IdBanco = this.idBancoSeleccionado;
    datosConsultarDeposito.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultarDeposito.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultarDeposito.IdCuenta = this.idCuentaSeleccionado;
    datosConsultarDeposito.IdProducto = this.idProductoSeleccionado;

    const datosConsultarPlanilla = new DatosConsultarPlanilla();
    datosConsultarPlanilla.IdProducto = this.idProductoSeleccionado;
    datosConsultarPlanilla.IdCanal = this.idCanalSeleccionado;
    datosConsultarPlanilla.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultarPlanilla.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultarPlanilla.IdPlanilla = this.idPlanillaFiltro;

    console.log(this.idPlanillaFiltro);
    this.service.consultarPlanillasPendientes(datosConsultarPlanilla).subscribe(
      s => {
        // console.log(s);
        this.listaplanillas = s;
        this.dataSourcePlanilla = new MatTableDataSource<
          ConciliacionManualPlanillas
        >(this.listaplanillas);
        this.dataSourcePlanilla.paginator = this.paginatorPlanilla;
        // console.log(this.dataSourcePlanilla.data);
      },
      e => {
        console.log(e);
      }
    );

    this.service.consultarDepositoPendientes(datosConsultarDeposito).subscribe(
      s => {
        // console.log(s);
        this.listadepositos = s;
        this.dataSourceDeposito = new MatTableDataSource<
          ConciliacionManualDepositos
        >(this.listadepositos);
        this.dataSourceDeposito.paginator = this.paginatorDeposito;
        // console.log(this.dataSourceDeposito.data);
      },
      e => {
        console.log(e);
      }
    );

    dialogRefLoad.close();
  }

  onLiquidar() {
    this.spinner.show();
    const planillasProcesar = this.selectionPlanilla.selected;
    const depositoProcesar = this.selectionDeposito.selected;
    const depositoExtornoProcesar = this.selectionDepositoExtornos.selected;
    const datosAplicacion = new DatosAplicacionManual();
    const usuarioProceso = JSON.parse(localStorage.getItem('currentUser'))
      .username;

    datosAplicacion.IdProducto = this.idProductoSeleccionado;
    datosAplicacion.FechaDesde = this.fechaDesdeSeleccionado;
    datosAplicacion.FechaHasta = this.fechaHastaSeleccionado;
    datosAplicacion.Usuario = usuarioProceso;

    for (let i = 0; i < planillasProcesar.length; i++) {
      // console.log(planillasProcesar[i].idPlanilla);
      datosAplicacion.IdPlanillas += planillasProcesar[i].idPlanilla + ',';
    }

    for (let i = 0; i < depositoProcesar.length; i++) {
      // console.log(depositoProcesar[i].idDeposito);
      datosAplicacion.IdDepositos += depositoProcesar[i].idDeposito + ',';
    }

    for (let i = 0; i < depositoExtornoProcesar.length; i++) {
      // console.log(depositoExtornoProcesar[i].idDeposito);
      datosAplicacion.IdDepositos +=
        depositoExtornoProcesar[i].idDeposito + ',';
    }

    this.service.aplicarConciliacionManual(datosAplicacion).subscribe(
      s => {
        // console.log(s);
        if (s.resultado === 1) {
          this.mensaje = s.mensaje;
          this.onFiltrar();
        } else {
          this.mensaje = s.mensaje;
        }
        // console.log(this.mensaje);

        this.spinner.hide();

        const dialogMensaje = this.dialog.open(DialogControl, {
          width: '300px',
          data: {
            tipoDialogo: this.tipoDialogoMensaje,
            mensajeDialogo: this.mensaje
          }
        });
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );

    this.iniciarSelectores();
  }

  protected iniciarSelectores() {
    this.selectionPlanilla = new SelectionModel<ConciliacionManualPlanillas>(
      true,
      []
    );
    this.selectionDeposito = new SelectionModel<ConciliacionManualDepositos>(
      true,
      []
    );
    this.selectionDepositoExtornos = new SelectionModel<
      ConciliacionManualDepositosExtornos
    >(true, []);
  }

  enabledButtonConsultar() {
    if (
      this.idProductoSeleccionado === 0 ||
      this.idCanalSeleccionado === -1 ||
      this.fechaDesdeSeleccionado.length === 0 ||
      this.fechaHastaSeleccionado.length === 0
    ) {
      this.ColorButton = 'white';
    } else {
      this.ColorButton = 'purple';
    }
    return (
      this.idProductoSeleccionado === 0 ||
      this.idCanalSeleccionado === -1 ||
      this.fechaDesdeSeleccionado.length === 0 ||
      this.fechaHastaSeleccionado.length === 0
    );
  }

  enabledButtonLiquidar() {
    // tslint:disable-next-line:prefer-const
    let cantidadPlanillasSeleccionados = this.selectionPlanilla.selected.length;
    // tslint:disable-next-line:prefer-const
    let cantidadDepositosSeleccionados = this.selectionDeposito.selected.length;
    if (
      cantidadPlanillasSeleccionados === 0 ||
      cantidadDepositosSeleccionados === 0
    ) {
      this.ColorButton = 'white';
    } else {
      this.ColorButton = 'purple';
    }
    return (
      cantidadPlanillasSeleccionados === 0 ||
      cantidadDepositosSeleccionados === 0
    );
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
      : 'unknown server error';

    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
