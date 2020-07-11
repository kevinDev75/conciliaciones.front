import { NgModule } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { TipoArchivo } from '../../_models/tipoarchivo.model';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DatosConsultaArchivos } from '../../_models/generacionexactus.model';
import { GeneracionExactusService } from '../../_services/generacionexactus.service';
import { DialogControl } from '../../conciliaciones/compartido/popupDialog.component';

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
  selector: 'app-generacionexactus',
  templateUrl: './generacionexactus.component.html',
  styleUrls: ['./generacionexactus.component.scss'],
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

export class GeneracionExactusComponent implements OnInit {

  ListaTipoArchivo: TipoArchivo[] = [];
  isRequired: boolean;
  tipoarchivoSeleccionado: number = 0;
  fechaDesdeSeleccionado: string = "";
  fechaHastaSeleccionado: string = "";

  respuesta: string = "";

  //Variables work
  public exito: boolean = false;
  public mensaje: string = "";
  public respuestaOkCancelDialog: string = "";

  //Constantes
  public respuestaOk: string = "Ok";
  public respuestaCancel: string = "Cancel";
  public tipoDialogoConfirmar: string = "Confirmar";
  public tipoDialogoLoad: string = "Load";
  public tipoDialogoMensaje: string = "Mensaje";

  constructor(private service: GeneracionExactusService, public dialog: MatDialog) { }

  openDialog(): void {

    let dialogRef = this.dialog.open(DialogControl, {
      width: '300px',
      data: { tipoDialogo: this.tipoDialogoConfirmar, respuestaOkCancelDialog: this.respuestaOkCancelDialog }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result != null) {
        this.respuestaOkCancelDialog = result.respuestaOkCancelDialog;
        if (this.respuestaOkCancelDialog == this.respuestaOk) {
          console.log('Enviando..');
          this.onEnviarExactus();
        }
      }
    });
  }

  ngOnInit() {
    this.getListaTipoArchivo();
  }

  getListaTipoArchivo() {
    this.service.listarTipoArchivo().subscribe(
      s => { console.log(s); this.ListaTipoArchivo = s },
      e => { console.log(e); });
  }

  onEnviarExactus() {
    let dialogRefLoad = this.dialog.open(DialogControl, {
      width: '300px',
      data: { tipoDialogo: this.tipoDialogoLoad }
    });

    //Agregado 16/07/2018
    const usuarioProceso = JSON.parse(localStorage.getItem('currentUser')).username;

    const datosConsultaArchivos = new DatosConsultaArchivos();
    datosConsultaArchivos.IdTipoArchivo = this.tipoarchivoSeleccionado;
    datosConsultaArchivos.FechaDesde = this.fechaDesdeSeleccionado;
    datosConsultaArchivos.FechaHasta = this.fechaHastaSeleccionado;
    datosConsultaArchivos.Usuario = usuarioProceso;

    this.service.generarArchivos(datosConsultaArchivos).subscribe(
      r => {
        console.log(r);
        this.respuesta = r;
        if (this.respuesta == "1") {
          this.mensaje = "Se envio el archivo satisfactoriamente.";
        }
        else if (this.respuesta == "2") {
          this.mensaje = "No se encontraron registros a procesar."
        }
        else {
          this.mensaje = "Hubo un error al realizar el envio."
        }
        dialogRefLoad.close();

        let dialogMensaje = this.dialog.open(DialogControl, {
          width: '300px',
          data: { tipoDialogo: this.tipoDialogoMensaje, mensajeDialogo: this.mensaje }
        });
      },
      e => {
        console.log(e);
        dialogRefLoad.close();
      }
    );

  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {
    }

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
