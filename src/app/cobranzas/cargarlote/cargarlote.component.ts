import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatTableDataSource, MatDialogConfig, MatPaginator } from '@angular/material';
import { DialogFormaPago } from '../cargarlote/dialog-formapago/dialogformapago.component';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FechasPipe } from 'app/_pipes/fechas.pipe';
import { CargarloteService } from '../../_services/cargarlote.service';
import { Producto } from '../../_models/producto.model';
import { Banco } from '../../_models/entidad.model';
import { Cargarlote, ListaConciliado } from '../../_models/cargarlote.model';
import { DialogControlPago } from 'app/cobranzas/cargarlote/dialog-formapago/compartido/popupDialog.component';
import { User } from 'app/_models/user.model';
import { ExcelService } from 'app/_services/exportexcel.service';
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
  selector: 'app-conciliacionmanual',
  templateUrl: './cargarlote.component.html',
  styleUrls: ['./cargarlote.component.scss'],
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

export class CargarLoteComponent implements OnInit {
  public listaproductos: Producto[] = [];
  public listabancos: Banco[] = [];
  public idProducto: number;
  public idEntidadBancaria: number;
  public descBanco: string;
  public srcResultExcel: any;
  public stringToBase64: any;
  public cantidadArchivos: number = 0;
  public tokenProceso: string;
  public idProceso: string;
  public importeTotal: number = 0;
  public idcuentabanco: string;
  public ExistError: boolean = false;
  public CantError: number = 0;
  public ConciliacionManual: boolean = false;
  public NroProforma: string;
  public fechaFin = new Date();
  public fechaInicio = new Date();
  maxDate = new Date();
  minDate = new Date();

  initialSelection = [];
  formatFecha = new FechasPipe();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('fileInput') resetFilePick: ElementRef;
  allowMultiSelect = true;
  dataSourceLote = new MatTableDataSource();
  dataSourceExcel = new MatTableDataSource();
  datePipe = new DatePipe('en-US');
  fileArray = new Array<File>();
  base64textString: string;
  public lote = new Array<{
    documentoCliente: string,
    fechaCarga: string,
    fechaCargaArchivo: string,
    fechaOperacion: string,
    fechaVencimiento: string,
    flagExtorno: number,
    idBanco: string,
    idCuentaBanco: string,
    idMoneda: string,
    idProceso: string,
    idProducto: string,
    idTipoPago: string,
    importe: string,
    montoFormaPago: string,
    nombreCliente: string,
    numeroOperacion: null
    numeroRecibo: string,
    referencia: string,
    select: number,
    tipoOperacion: string,
    userCode: string,
    factura: boolean,
    Observacion: string
  }>();

  public dataToExport: any = [];
  public dataToExportError: any = [];
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

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


  public doFilter = (value: string) => {
    this.dataSourceLote.filter = value.trim().toLocaleLowerCase();
  }
  constructor(private dialog: MatDialog, private toastr: ToastrService, private service: CargarloteService, private serviceExporta: ExcelService) {

  }

  // displayedColumnsTrama = ['select', 'CuentaProtecta', 'Contratante', 'Documento', 'Cod. Proforma', 'Fecha Vencimiento', 'Fecha Operacion', 'Fecha Carga Archivo', 'Importe', 'Factura', 'Observacion'];
  displayedColumnsTrama = ['select', 'CuentaProtecta', 'Documento', 'Cod. Proforma', 'Fecha Vencimiento', 'Fecha Operacion', 'Fecha Carga Archivo', 'Importe', 'Factura', 'Observacion'];

  displayedColumnsExcel = ['Nombre', 'Accion'];
  tamaniolote = 0;
  ngOnInit() {
    this.service.listarProducto().subscribe(
      s => { this.listaproductos = s },
      e => { console.log(e); });

    this.service.listarBanco().subscribe(
      s => {
        this.listabancos = s;
        console.log(this.listabancos);
        this.listabancos.push(new Banco(0, "CONCILIACION MANUAL"));
      },
      e => { console.log(e); });


    this.dataSourceLote.paginator = this.paginator;
  }
  onFileSelected(file: File[]) {
    let existe: Boolean = false;
    if (file[0].type != "text/plain") {
      this.toastr.error('El archivo no es de tipo .txt', 'Gestión de Cobranzas');
      this.fileArray = new Array<File>();
    } else {
      this.fileArray.forEach(element => {
        if (file[0].name === element.name) {
          existe = true;
          this.toastr.error('El archivo ' + element.name + ' ya se encuentra en la lista', 'Gestión de Cobranzas');
        }
      });
      if (existe === false) {
        this.fileArray.push(file[0]);
        this.dataSourceExcel.data = this.fileArray;
      }
    }
    this.resetFilePick.nativeElement.value = "";
  }

  onFileSelectedExcel(file: File) {
    this.srcResultExcel = file.name;
  }


  ValPlanillaFactura(): void {
    if (this.lote.length > 0) {
      const Listado = new ListaConciliado();
      Listado.IdProceso = this.idProceso;
      Listado.IdBanco = this.idEntidadBancaria.toString();
      Listado.IdProducto = this.idProducto.toString();
      Listado.IdCuentaBanco = this.idcuentabanco;
      this.service.ValidarPlanillaFacturas(Listado).subscribe(
        s => {
          console.log(s);
          if (s.data === true) {

            this.toastr.error('Falta generar comprobantes a algunas proformas!', 'Generar planilla');

            /* const dialogRef = this.dialog.open(DialogControlPago, {
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
                   this.openDialogFormaPago();
                 }
               }
             });*/
          } else {
            this.openDialogFormaPago();
          }
        },
        e => {
          this.toastr.error('Hubieron problemas', 'Generar planilla');
        }
      );
    } else {
      this.toastr.warning('No se ha procesado ningún archivo.', 'Gestión de Cobranzas');
    }
  }
  openDialogFormaPago() {

    this.dialog.open(DialogFormaPago, {
      disableClose: false,
      autoFocus: true,
      width: '900px',
      height: '500px',
      data: {
        importeTotal: this.importeTotal,
        banco: this.descBanco,
        idproceso: this.idProceso,
        idproducto: this.idProducto,
        idcuentabanco: this.idcuentabanco,
        idbanco: this.idEntidadBancaria
      }

    }).afterClosed().subscribe(
      val => {
        if (val === 'R') {
          console.log('entro DialogFormaPago Dialog output:', val);
          document.getElementById('buscarPerfiles').click();
        }
      }
    );
  }

  onExportarExcel() {
    if (this.lote.length > 0) {
      this.serviceExporta.exportAsExcelFile(this.dataToExport, 'Gestión de Cobranzas');
    } else {
      this.toastr.warning('No hay datos para exportar', 'Gestión de Cobranzas');
    }

  }
  onExportarExcelError() {
    if (this.dataToExportError.length > 0) {
      this.serviceExporta.exportAsExcelFile(this.dataToExportError, 'Errores trama');
    } else {
      this.toastr.warning('No hay datos para exportar', 'Gestión de Cobranzas');
    }

  }

  onDelete(i) {
    this.fileArray.splice(i, 1);
    this.dataSourceExcel.data = this.fileArray;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceLote.data.length;
    return numSelected == numRows;
  }
  onValidarLote(myForm: NgForm) {
    this.idProceso = '';
    this.lote = [];
    this.importeTotal = 0;

    if (this.fileArray.length == 0 && this.idEntidadBancaria != 0) {
      this.toastr.error('Por favor adjuntar al menos un archivo', 'Gestión de Cobranzas');
    } else {
      if (myForm.valid) {
        const dialogRefLoad = this.dialog.open(DialogControlPago, {
          width: '300px',
          data: { tipoDialogo: 'Load' }
        });
        this.CantError = 0;
        this.dataToExportError = [];
        this.dataToExport = [];
        if (this.idEntidadBancaria == 0) {
          this.onSearchProforma();
        } else {
          this.onReadFile();
        }

      } else {
        this.toastr.error('Por favor completar todos los campos', 'Gestión de Cobranzas');
      }
    }
  }
  onChangeSelecBanco(newObj) {
    console.log(newObj);
    this.listabancos.forEach(element => {
      if (newObj === 0) {
        this.ConciliacionManual = true;
        this.ExistError = false;
      } else {
        this.ConciliacionManual = false;
        if (this.dataToExportError.length > 0) {
          this.ExistError = true;
        }
      }
      if (element.idBanco == newObj) {
        this.descBanco = element.descripcionBanco;
        console.log(this.descBanco);
      }
    });

  }
  onReadFile() {

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.fileArray[this.cantidadArchivos]);
  }
  onSearchProforma() {
    const datePipe = new DatePipe('en-US');
    const usercode = localStorage.getItem('currentUser');
    const jsonObj: any = JSON.parse(usercode);
    const user: User = <User>jsonObj;
    const cargarLote: Cargarlote = new Cargarlote();
    console.log(this.idEntidadBancaria);
    cargarLote.IdBanco = this.idEntidadBancaria;
    cargarLote.UserCode = user.id.toString();
    cargarLote.IdProducto = this.idProducto;
    cargarLote.IdProceso = this.idProceso;
    cargarLote.CodProforma = this.NroProforma;
    cargarLote.FechaInicial = datePipe.transform(this.fechaInicio, 'dd/MM/yyyy');
    cargarLote.FechaFinal = datePipe.transform(this.fechaFin, 'dd/MM/yyyy');
    this.service.procesarTrama(cargarLote).subscribe(
      s => {
        console.log(s);
        if (s.esValido === false) {
          this.toastr.warning(s.mensaje, 'Gestión de Cobranzas');
          this.fillDataToExport(s.listado, '');
          this.dataSourceLote.data = this.lote;
          this.cantidadArchivos = 0;
        } else {
          if (s.listado.length > 0) {
            this.fillDataToExport(s.listado, '');
            this.dataSourceLote.data = this.lote;
            this.cantidadArchivos = 0;
          } else {
            this.toastr.warning('no se encontro informacion.', 'Gestión de Cobranzas');
            this.fillDataToExport(s.listado, '');
            this.dataSourceLote.data = this.lote;
            this.cantidadArchivos = 0;
          }
        }
        this.closeDialog();
      }
      , e => {
        this.toastr.error('Hubieron problemas al buscar ', 'Gestión de Cobranzas'); this.closeDialog(); console.log(e);
        this.closeDialog();
      });
  }

  _handleReaderLoaded(readerEvt) {
    var usercode = localStorage.getItem('currentUser');
    let FileName: string = this.fileArray[this.cantidadArchivos].name
    let jsonObj: any = JSON.parse(usercode); // string to generic object first
    let user: User = <User>jsonObj;
    var binaryString = readerEvt.target.result;
    let cargarLote: Cargarlote = new Cargarlote();
    cargarLote.IdBanco = this.idEntidadBancaria;
    cargarLote.UserCode = user.id.toString();
    cargarLote.IdProducto = this.idProducto;
    cargarLote.IdProceso = this.idProceso;
    cargarLote.Data = btoa(binaryString);
    this.service.procesarTrama(cargarLote).subscribe(
      s => {
        this.cantidadArchivos++;
        if (s.esValido) {
          console.log(s.listado);
          console.log(this.cantidadArchivos);
          if (this.fileArray[this.cantidadArchivos]) {
            this.onReadFile();
            s.tiempoTranscurrido = +s.tiempoTranscurrido;
            this.fillDataToExport(s.listado, FileName);
          } else {
            this.fillDataToExport(s.listado, FileName);
            this.dataSourceLote.data = this.lote;
            this.cantidadArchivos = 0;
            if (s.listado.filter(x => x.isValido === true).length === s.listado.length && this.dataToExportError.length === 0) {
              this.ExistError = false;
              this.toastr.success('Carga exitosa. Tiempo transcurrido : ' + s.tiempoTranscurrido + ' seg.', 'Gestión de Cobranzas');
            } else {
              this.toastr.warning('Carga con problemas. Se encontraron (' + this.CantError + ') error(ES)   - ' +
                s.tiempoTranscurrido + ' seg.', 'Gestión de Cobranzas');
            }
            this.closeDialog();
          }
        } else {
          this.fillDataToExport(s.listado, FileName);
          this.dataSourceLote.data = this.lote;
          this.cantidadArchivos = 0;
          this.toastr.error(s.mensaje, 'Gestión de Cobranzas');
          // this.toastr.error('Hubieron problemas al subir el archivo :' + s.mensaje, 'Gestión de Cobranzas');
          this.closeDialog();
        }
      },
      e => { this.toastr.error('Hubieron problemas al subir el archivo', 'Gestión de Cobranzas'); this.closeDialog(); console.log(e); }
    );

  }
  fillDataToExport(listado: any[], archivo?: string) {
    let sumaImporte: number = 0;
    const datePipe = new DatePipe('en-US');
    listado.forEach(e => {
      if (e.isValido) {
        this.dataToExport.push({
          "Nro de Cuenta": e.idCuentaBanco,
          // "Contratante": e.nombreCliente,
          "Documento": e.documentoCliente,
          "Cod. Proforma": e.numeroRecibo,
          "Fecha Vencimiento": e.fechaVencimiento.substring(0, 10),
          "Fecha Operacion": e.fechaOperacion.substring(0, 10),
          "Fecha Carga Archivo": e.fechaCargaArchivo,
          "Importe": e.importe
        });
        this.idProceso = e.idProceso;
        this.idcuentabanco = e.idCuentaBanco;
        sumaImporte = sumaImporte + Number(e.importe);
        e.select = 0;
        this.lote.push(e);
      } else {
        this.CantError++;
        this.dataToExportError.push({
          'N° Error ': this.CantError, 'Archivo ': archivo,
          'Descripcion': e.mensaje
        });

        this.ExistError = true;
      }
    });
    console.log(this.dataToExportError);
    this.importeTotal = this.importeTotal + sumaImporte;
  }
  closeDialog() {
    setTimeout(() => {
      this.dialog.closeAll();
    }, 500);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.lote.forEach(element => {
        element.select = 0;
      });
    } else {
      this.dataSourceLote.data.forEach(row => {

        this.selection.select(row);
      });
      this.lote.forEach(element => {

        element.select = 1;

      });
    }

  }
  selectRow(row: any) {
    this.lote.forEach(element => {
      if (element.numeroRecibo == row.numeroRecibo) {
        element.select = element.select == 0 ? 1 : 0;
      }
    });
  }
  insertarFectura() {
    var usercode = localStorage.getItem('currentUser');
    let jsonObj: any = JSON.parse(usercode); // string to generic object first
    let user: User = <User>jsonObj;
    var array = new Array<ListaConciliado>();
    this.lote.forEach(element => {
      if (element.select == 1 && element.factura != true) {
        const factura = new ListaConciliado();
        factura.IdProceso = this.idProceso;
        factura.IdBanco = this.idEntidadBancaria.toString();
        factura.IdProducto = this.idProducto.toString();
        factura.TipoOperacion = 'GF';
        factura.NumeroRecibo = element.numeroRecibo;
        factura.Importe = element.importe;
        factura.IdMoneda = element.idMoneda;
        factura.IdCuentaBanco = this.idcuentabanco;
        factura.FechaOperacion = element.fechaOperacion;
        factura.FlagExtorno = element.flagExtorno;
        factura.UserCode = user.id.toString();
        array.push(factura);
      }
    });
    if (array.length > 0) {
      const dialogRefLoad = this.dialog.open(DialogControlPago, {
        width: '300px',
        data: { tipoDialogo: 'Load' }
      });


           const dialogRef = this.dialog.open(DialogControlPago, {
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
                   
                  this.service.insertarformapago(array).subscribe(
                    s => {
                      console.log(s);
                      let ListVouchers: any[] = s.data;
                      if (s.code == "0") {
                        this.lote.forEach(element => {
                          if (element.select == 1) {
                            let voucher = ListVouchers.filter(x => x.scampo == element.numeroRecibo && x.sgrupo == element.idProceso)[0];
                            if (voucher != null) {
                              element.Observacion = voucher.smensaje;
                              element.factura = (voucher.svalor == '1' ? true : false);
                            }
                          }
            
                        })
                        if (ListVouchers.filter(x => x.svalor == '1').length == ListVouchers.length) {
                          this.toastr.success(s.message, 'Generar Factura');
                        } else {
                          this.toastr.warning('Se encontro problemas en algunas proformas, revisar las observaciones', 'Generar Factura')
                        }
                      }
                      else {
                        this.toastr.error(s.message, 'Generar Factura');
                      }
                      this.closeDialog();
                    },
                    e => {
                      this.toastr.error('Hubieron problemas para generar la Factura', 'Generar Fectura');
                      this.closeDialog();
                    }
                  );


                 }
               }
             });

    

    } else {
      this.toastr.warning('Debe seleccionar al menos una cuenta para el proceso de Facturación.', 'Generar Factura')
    }
  }

}