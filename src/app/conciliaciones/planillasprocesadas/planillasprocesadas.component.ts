import { Component, Inject, OnInit, ViewChild, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanillasProcesadasService } from '../../_services/planillasprocesadas.service';
import { PlanillasProcesadasResultado, DatosConsultarPlanilla } from '../../_models/planillasprocesadas.model';
import { Producto } from '../../_models/producto.model';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {Banco, Cuenta} from '../../_models/entidad.model';
import { FormControl } from '@angular/forms';
import { DialogControl } from '../../conciliaciones/compartido/popupDialog.component';

import { ExcelService } from '../../_services/exportexcel.service';
import { Canal } from '../../_models/canal.model';
import { CanalesService } from '../../_services/canal.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'planillasprocesadas',
  templateUrl: './planillasprocesadas.component.html',
  styleUrls: ['./planillasprocesadas.component.scss'],
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
export class PlanillasProcesadasComponent implements OnInit {
  public listaplanillasprocesadas: PlanillasProcesadasResultado[] = [];
  public listaproductos: Producto[] = [];
  DatosConsultaPlanilla = new DatosConsultarPlanilla();

  // Iteraccion
  public idBancoSeleccionado = -1;
  public idCuentaSeleccionado = 0;
  public idProductoSeleccionado = 0;
  public idCanalSeleccionado = -1;
  public fechaDesdeSeleccionado = '';
  public fechaHastaSeleccionado = '';

  public tipoDialogoLoad = 'Load';
  //Mensaje
  public respuestaOk = 'Ok';
  public respuestaCancel = 'Cancel';
  public tipoDialogoConfirmar = 'Confirmar';
  public tipoDialogoMensaje = 'Mensaje';
  public respuestaOkCancelDialog = '';
  public breversion = false;

  public isRequired = true;
  public isRequiredFi = true;
  date = new FormControl(new Date());

  // Inicio Control de Cambio 1.1
  public listacanal: Canal[] = [];
  public listabanco: Banco[] = [];
  public listacuenta: Cuenta[] = [];
  public ColorButton: string;

  // tslint:disable-next-line:max-line-length
  displayedColumnsPlanilla = [
    'banco',
    'descripcionProducto',
    'fechaConciliacion',
    // 'codigoCanal',
    'descripcionCanal',
    'idPlanilla',
    'fechaPlanilla',
    'numeroOperacion',
    'fechaDeposito',
    'estadoPlanilla',
    'totalPlanilla',
    'totalDeposito',
    'importeDeposito',
    'saldoDeposito',
    'sRevertir'
  ];
  dataSourcePlanilla = new MatTableDataSource<PlanillasProcesadasResultado>(
    this.listaplanillasprocesadas
  );
  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: string;

  constructor(
    private service: PlanillasProcesadasService,
    private canalservice: CanalesService,
    public dialog: MatDialog,
    private serviceExporta: ExcelService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.service.listarProductos().subscribe(
      s => {
        this.listaproductos = s;
        this.idProductoSeleccionado = this.listaproductos[0].idProducto;
      },
      e => {
        console.log(e);
      }
    );
    this.canalservice.listarCanal().subscribe(
      s => {
        // console.log(s);
        this.listacanal = s;
        this.idCanalSeleccionado = this.listacanal[0].idCanal;
      },
      e => {
        console.log(e);
      }
    );

    this.service.listarBanco(true).subscribe(
      s => {
        this.listabanco = s;
        this.idBancoSeleccionado = 0;
        this.onConsultarCuentas();
      },
      e => {
        console.log(e);
      }
    );
  }

  onExtornar(idPlanilla) {
    this.service.revertirConciliacion(idPlanilla).subscribe(s => {}, e => {});
  }

  onFiltrar() {
    this.spinner.show();
    const datosConsultaPlanilla = new DatosConsultarPlanilla();
    datosConsultaPlanilla.IdProducto = this.idProductoSeleccionado;
    datosConsultaPlanilla.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultaPlanilla.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultaPlanilla.IdCanal = this.idCanalSeleccionado;
    datosConsultaPlanilla.IdBanco = this.idBancoSeleccionado;
    datosConsultaPlanilla.IdCuenta = this.idCuentaSeleccionado;

    this.service.consultarPlanillasProcesadas(datosConsultaPlanilla).subscribe(
      s => {
         console.log(s);
        this.listaplanillasprocesadas = s;
        const DescriptProduct = this.listaproductos.filter(x => x.idProducto === datosConsultaPlanilla.IdProducto).shift().descProducto;
        if (this.listaplanillasprocesadas.length > 0)  {
          this.listaplanillasprocesadas.forEach(item => {
            item.descripcionProducto = DescriptProduct;
        });
        }
        this.dataSourcePlanilla = new MatTableDataSource<
          PlanillasProcesadasResultado
        >(this.listaplanillasprocesadas);
        this.dataSourcePlanilla.paginator = this.paginator;

        // console.log(this.dataSourcePlanilla.data);
        this.spinner.hide();
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );
  }

  onExportar() {
    this.spinner.show();
    const datosConsultaPlanilla = new DatosConsultarPlanilla();
    datosConsultaPlanilla.IdProducto = this.idProductoSeleccionado;
    datosConsultaPlanilla.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultaPlanilla.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultaPlanilla.IdCanal = this.idCanalSeleccionado;    

    this.service.consultarPlanillasProcesadas(datosConsultaPlanilla).subscribe(
      s => {
        this.listaplanillasprocesadas = s;
        this.serviceExporta.exportAsExcelFile(
          this.listaplanillasprocesadas,
          'Consulta'
        );
        this.spinner.hide();
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );
  }

  enabledButtonProceso() {
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

  onRevertir(id: number, idEstadoPlanilla: string) {
      console.log('Revertir - Estado de planilla');
      console.log(idEstadoPlanilla);
      this.service.validarFacturaDePlanilla(id).subscribe(ok => {
      let _message: string;
      console.log('cantidad: ' + ok.cantidad);
      if (ok.cantidad > 0) {
        _message = idEstadoPlanilla === '1107' ?
        'La planilla posee polizas asociadas a un comprobante. Asegúrese de revisar el estado del comprobante y realizar la reversión del Control Bancario. ¿Desea continuar?'
        : 'La planilla posee polizas asociadas  a un comprobante. Asegúrese de revisar el estado del comprobante.  ¿Desea continuar?';
        const dialogRef = this.dialog.open(DialogControl, {
          width: '400px',
          data: {
            tipoDialogo: this.tipoDialogoConfirmar,
            respuestaOkCancelDialog: this.respuestaOkCancelDialog,
            bMensajeDefault: false,
            mensajeMostrarConfirmar: _message
          }
        });

        dialogRef.afterClosed().subscribe(
          result => {
            if (result != null) {
              // console.log('result.cantidad');
              // console.log(ok.cantidad);
              // console.log(result.respuestaOkCancelDialog);
              // this.respuestaOkCancelDialog = result.respuestaOkCancelDialog;
              if (result.respuestaOkCancelDialog == this.respuestaOk) {
                const dialogRefConfirm = this.dialog.open(DialogControl, {
                  width: '400px',
                  data: {
                    tipoDialogo: this.tipoDialogoConfirmar,
                    respuestaOkCancelDialog: this.respuestaOkCancelDialog,
                    bMensajeDefault: false,
                    mensajeMostrarConfirmar:
                      'Se procederá a revertir la conciliación de la planilla N° ' +
                      id.toString() +
                      '. ¿Desea continuar?'
                  }
                });

                dialogRefConfirm.afterClosed().subscribe(results => {
                  if (results != null) {
                    if (results.respuestaOkCancelDialog == this.respuestaOk) {
                      // console.log('ok result dialog');
                      this.service.revertirConciliacion(id).subscribe(
                        s => {
                          const dialogRefMsj = this.dialog.open(DialogControl, {
                            width: '300px',
                            data: {
                              tipoDialogo: this.tipoDialogoMensaje,
                              mensajeDialogo:
                                'La reversión de la planilla N° ' +
                                id.toString() +
                                ' fue satisfactoria.'
                            }
                          });
                        },
                        e => {
                          console.log(e);
                        }
                      );
                    }
                  }
                });
              }
            }
          },
          error => {}
        );
      } else {
        const dialogRefConfirm = this.dialog.open(DialogControl, {
          width: '400px',
          data: {
            tipoDialogo: this.tipoDialogoConfirmar,
            respuestaOkCancelDialog: this.respuestaOkCancelDialog,
            bMensajeDefault: false,
            mensajeMostrarConfirmar:
              'Se procederá a revertir la conciliación de la planilla N° ' +
              id.toString() +
              '. ¿Desea continuar?'
          }
        });

        dialogRefConfirm.afterClosed().subscribe(results => {
          if (results != null) {
            if (results.respuestaOkCancelDialog == this.respuestaOk) {
              // console.log('si reversion');
              this.service.revertirConciliacion(id).subscribe(
                s => {
                  // console.log(s);
                  const dialogRefMsj = this.dialog.open(DialogControl, {
                    width: '300px',
                    data: {
                      tipoDialogo: this.tipoDialogoMensaje,
                      mensajeDialogo:
                        'La reversión de la planilla N° ' +
                        id.toString() +
                        ' fue satisfactoria.'
                    }
                  });
                  this.onFiltrar();
                },
                e => {
                  console.log(e);
                  const dialogRefMsj = this.dialog.open(DialogControl, {
                    width: '300px',
                    data: {
                      tipoDialogo: this.tipoDialogoMensaje,
                      mensajeDialogo:
                        'Ocurrió un error al eliminar el comprobante.'
                    }
                  });
                }
              );
            }
          }
        });
      }
    });
    /* */
  }

  onConsultarCuentas() {
    this.service.listarCuentaXBanco(this.idBancoSeleccionado).subscribe(
      s => {
        // console.log(s);
        this.listacuenta = s;
      },
      e => {
        console.log(e);
      }
    );
  }
}
