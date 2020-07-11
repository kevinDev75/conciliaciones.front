import { NgModule } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../../_models/producto.model';
import { DatosConsultaPlanilla} from '../../_models/planillasimportadas.model';
import { PlanillasImportadasService } from '../../_services/planillasimportadas.service';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { DialogControl } from '../compartido/popupDialog.component';
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
  selector: 'app-planillasimportadas',
  templateUrl: './planillasimportadas.component.html',
  styleUrls: ['./planillasimportadas.component.scss'],
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
export class PlanillasImportadasComponent implements OnInit {
  ListaProducto: Producto[] = [];

  DatosConsultaPlanilla = new DatosConsultaPlanilla();
  productoSeleccionado: number = 0;
  fechaDesdeSeleccionado: string = '';
  fechaHastaSeleccionado: string = '';

  respuesta: string = '';
  public isRequired: boolean = true;

  //Variables work
  public exito: boolean = false;
  public mensaje: string = '';
  public respuestaOkCancelDialog: string = '';

  //Constantes
  public respuestaOk: string = 'Ok';
  public respuestaCancel: string = 'Cancel';
  public tipoDialogoConfirmar: string = 'Confirmar';
  public tipoDialogoLoad: string = 'Load';
  public tipoDialogoMensaje: string = 'Mensaje';

  constructor(
    private service: PlanillasImportadasService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogControl, {
      width: '300px',
      data: {
        tipoDialogo: this.tipoDialogoConfirmar,
        respuestaOkCancelDialog: this.respuestaOkCancelDialog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result != null) {
        this.respuestaOkCancelDialog = result.respuestaOkCancelDialog;
        if (this.respuestaOkCancelDialog == this.respuestaOk) {
          console.log('Importando..');
          this.onImportar();
        }
      }
    });
  }

  ngOnInit() {
    this.getListaProducto();
  }

  getListaProducto() {
    this.service.listarProductos().subscribe(
      s => {
        console.log(s);
        this.ListaProducto = s;
      },
      e => {
        console.log(e);
      }
    );
  }

  onImportar() {
    this.spinner.show();

    //Agregado 16/07/2018
    const usuarioProceso = JSON.parse(localStorage.getItem('currentUser'))
      .username;

    const datosConsultaPlanilla = new DatosConsultaPlanilla();
    datosConsultaPlanilla.IdProducto = this.productoSeleccionado;
    datosConsultaPlanilla.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultaPlanilla.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultaPlanilla.Usuario = usuarioProceso;

    this.service.importarPlanillas(datosConsultaPlanilla).subscribe(
      r => {
        console.log(r);
        this.respuesta = r;

        if (this.respuesta == '1') {
          this.mensaje = 'Proceso Completado con Exito.';
        } else if (this.respuesta == '0') {
          this.mensaje =
            'No se encontraron planillas a conciliar para el producto y rango de fechas especificado.';
        } else {
          this.mensaje = 'Hubo un error al realizar la Importacion.';
        }

        this.spinner.hide();
        let dialogMensaje = this.dialog.open(DialogControl, {
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
  }

  enabledButtonImportar() {
    return (
      this.productoSeleccionado == 0 ||
      this.fechaDesdeSeleccionado.length == 0 ||
      this.fechaHastaSeleccionado.length == 0
    );
  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {}

    let errMsg = error.errorMessage
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