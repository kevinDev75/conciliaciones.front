import { Component, Inject, OnInit, ViewChild, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DocumentosAbonos, DatosConsultaDocumento } from '../../_models/documentoabono.model';
import { DocumentoAbonoService } from '../../_services/documentoabono.service';
import { DialogControl } from '../../conciliaciones/compartido/popupDialog.component';
import { GeneracionFacturaComponent } from '../generacionfactura/generacionfactura.component';

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
  selector: 'documentoabono',
  templateUrl: './documentoabono.component.html',
  styleUrls: ['./documentoabono.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class DocumentoAbonoComponent implements OnInit {
  public listaDocumentosAbonos: DocumentosAbonos[] = [];
  public DatosConsultarDocumento = new DatosConsultaDocumento();
  public numerofacturaSeleccionado = null;
  public fechaDesdeSeleccionado = null;
  public fechaHastaSeleccionado = null;
  public tipoDialogoLoad = 'Load';
  public isRequired = true;
  public isRequiredFi = true;

  valida: string = "";
  date = new FormControl(new Date());

  config: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    width: '500px',
    height: '400px'
  };

  displayedColumnsDocumentoAbono = ['numeroFactura', 'fechaFactura', 'montoFactura', 'idNotaCredito', 'fechaNotaCredito', 'estado'];
  dataSourceDocumentoAbono = new MatTableDataSource<DocumentosAbonos>(this.listaDocumentosAbonos);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: string;

  constructor(public dialog: MatDialog,
    public ventana: MatDialog,
    private service: DocumentoAbonoService
  ) {

  }

  ngOnInit() {
    this.config.data = { Titulo: 'Generación de Factura de Abonos' };
  }

  onFiltrar() {

    const dialogRefLoad = this.dialog.open(DialogControl, {
      width: '300px',
      data: { tipoDialogo: this.tipoDialogoLoad }
    });

    const datosConsultaDocumento = new DatosConsultaDocumento();
    datosConsultaDocumento.numeroFactura = this.numerofacturaSeleccionado;
    datosConsultaDocumento.fechaDesde = this.fechaDesdeSeleccionado;
    datosConsultaDocumento.fechaHasta = this.fechaHastaSeleccionado;

    this.service.listarDocumentosAbonos(datosConsultaDocumento).subscribe(
      s => {
        console.log(s);
        this.listaDocumentosAbonos = s;
        this.dataSourceDocumentoAbono = new MatTableDataSource<DocumentosAbonos>(this.listaDocumentosAbonos);
        this.dataSourceDocumentoAbono.paginator = this.paginator;
        console.log(this.dataSourceDocumentoAbono.data);

        dialogRefLoad.close();
      },
      e => {
        console.log(e);
        dialogRefLoad.close();
      });

  }

  openDialogNuevaFactura() {

    this.service.validaGeneracionFactura().subscribe(
      s => {
        console.log(s);
        this.valida = s

        if (this.valida == "1") {
          const dialogRefWindow = this.ventana.open(GeneracionFacturaComponent, this.config);

          dialogRefWindow.afterClosed().subscribe(
            val => {
              if (val === 'R') {
                console.log('entro openDialogNuevaFactura Dialog output:', val);
              }
            });
        }
        else {
          let dialogMensaje = this.dialog.open(DialogControl, {
            width: '300px',
            data: { tipoDialogo: "Mensaje", mensajeDialogo: this.valida }
          });
        }
      },
      e => {
        console.log(e);
      });
  }

  enabledButtonProceso() {
    //return (this.numerofacturaSeleccionado.length === 0 || this.fechaDesdeSeleccionado.length === 0 || this.fechaHastaSeleccionado.length === 0);
  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {
    }

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