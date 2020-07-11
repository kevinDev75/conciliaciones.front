
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DialogControlPago } from '../dialog-formapago/compartido/popupDialog.component';
import { Form, NgForm } from '@angular/forms';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { ListaConciliado, Cargarlote } from 'app/_models/cargarlote.model';
import { User } from 'app/_models/user.model';
import { CargarloteService } from 'app/_services/cargarlote.service';
import { Banco } from '../../../_models/entidad.model';
import { renderTemplate } from '@angular/core/src/render3/instructions';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
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
  selector: 'app-dialog-usuarios-perfil',
  templateUrl: './dialogformapago.component.html',
  styleUrls: ['./dialogformapago.component.scss'],
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
export class DialogFormaPago implements OnInit {
  public opcionMoneda = [
    { "id": "1", "name": "Soles" },
    { "id": "2", "name": "Dolares" }
  ]

  public opcionTipoPago = [
    //{ "id": "1", "name": "Visa" },
    //{ "id": "2", "name": "Pago Efectivo" },
   // { "id": "3", "name": "Transferencia" }
  ]

  public opcionCuenta = [
    // { "id": "101", "name": "Cta Cuenta Recaudadora BCP" },
    // { "id": "102", "name": "Cuenta Recaudadora BBVA" }
  ]
  public opcionBanco = [
    { "id": "BBVA", "name": "BBVA" },
    { "id": "Interbank", "name": "Interbank" },
    { "id": "BCP", "name": "BCP" }
  ]
  public idEntidadBancaria = '';
  public defectotipopago = '';
  public banco = '';
  public listabancos: Banco[] = [];
  public defectocuenta = '';
  public sumaplanilla = 0;
  public nrooperacion = '';
  public referencia = '';
  public defectomoneda = '';
  public idproceso: string;
  public idproducto: number;
  public idbanco: number;
  public idcuentabanco: string;
  displayedColumnsPago = ['NLote', 'DescMoneda', 'DescTipoPago', 'Banco', 'DescCuenta', 'NroOperacion', 'Fecha', 'Importe', 'Accion'];
  public listaPago: any[] = [];
  public mensaje: string = "";
  public ConManual: boolean = false;
  // public importeTotal:string;
  public tipoDialogoMensaje: string = "Mensaje";
  public usuario = new Array<{
    NLote: number, Moneda: string, DescMoneda: string, TipoPago: string, DescTipoPago: string, Banco: string,
    Cuenta: string, DescCuenta: string, NroOperacion: string, Fecha: string, Importe: string, IdMoneda: string,
    IdTipoPago: string, Referencia: string
  }>();
  dataSourcePago = new MatTableDataSource();
  fechaoperacion = '';
  formatfecha = '';
  importe = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tamanioarray = 0;
  loading = true;
  public tipoDialogoConfirmar: string = "Confirmar";
  public respuestaOkCancelDialog: string = "";
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogControlPago, {
      width: '300px',
      data: { tipoDialogo: this.tipoDialogoConfirmar, respuestaOkCancelDialog: this.respuestaOkCancelDialog }
    });

  }
  constructor(
    private toastr: ToastrService,
    private service: CargarloteService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogFormaPago>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sumaplanilla = Math.round(Number(data.importeTotal) * 100) / 100;
    this.banco = data.banco;
    this.idproceso = data.idproceso;
    this.idproducto = data.idproducto;
    this.idcuentabanco = data.idcuentabanco;
    this.idbanco = data.idbanco;
  }


  ngOnInit() {
    console.log(this.idbanco);
    this.ListarTipoPago();
    if (this.idbanco === 0) {
      this.ConManual = true;
    }
    this.service.listarBanco().subscribe(
      s => {
        this.listabancos = s;
      },
      e => { console.log(e); });

    this.ListarCuentas();

    this.defectomoneda = '1';

  }
  ListarCuentas() {
    this.service.listarCuenta(this.idbanco).subscribe(
      s => {
        this.opcionCuenta = s;
        if (this.ConManual === false) {
          if (this.idbanco !== 3) {
            this.obtenerFormaPago();
          }
        }

      },
      e => { console.log(e); });
  }
  ListarTipoPago() {
    this.service.listarTipoPago().subscribe(
      s => {
        this.opcionTipoPago = s;
        console.log(this.opcionTipoPago);
      },
      e => { console.log(e); });
  }

  ngAfterViewInit() {

    this.dataSourcePago.paginator = this.paginator;
    this.dataSourcePago.sort = this.sort;
  }
  limpiar() {
    this.fechaoperacion = '';
    this.importe = '';
    this.referencia = '';
    this.nrooperacion = '';
    this.defectotipopago = '';
    this.defectocuenta = '';
    this.idEntidadBancaria = '';

    //this.defectomoneda = '';


  }
  getNameOption(array: any, value: any) {
    let nameObj: string = '';
    array.forEach(element => {
      if (element.id == value.toString()) {
        nameObj = element.name;
      }
    });
    return nameObj;
  }
  documentNumberKeyPress(event: any) {
    const CaracterNot: string[] = ['-', '+'];
    const inputChar = String.fromCharCode(event.charCode);
    if (CaracterNot.some(x => x === inputChar)) {
      event.preventDefault();
    }
  }
  onChangeSelecBanco(newObj) {
    console.log(newObj);
    this.listabancos.forEach(element => {
      if (element.idBanco === newObj) {
        this.banco = element.descripcionBanco;
        this.idbanco = element.idBanco;
      }
    });
    this.ListarCuentas();

  }

  ValidateFecha(date) {
    return true;
  }

  agregarPago(myForm: NgForm) {

    if (this.ValidateFecha(this.fechaoperacion)) {
      if (myForm.valid) {
        if (this.onValidarIngresoTabla()) {
          const datePipe = new DatePipe('en-US');
          this.formatfecha = datePipe.transform(this.fechaoperacion, 'dd/MM/yyyy');
          let DesMoneda: string = this.getNameOption(this.opcionMoneda, this.defectomoneda);
          let desTipoPago: string = this.getNameOption(this.opcionTipoPago, this.defectotipopago);
          // let desCuenta: string = this.getNameOption(this.opcionCuenta, this.defectocuenta);
          let desCuenta: string = '';
          this.opcionCuenta.forEach(element => {
            if (element.idCuenta == this.defectocuenta.toString()) {
              desCuenta = element.descripcionCuenta;
            }
          });
          this.usuario.push({
            NLote: this.usuario.length + 1, Moneda: this.defectomoneda, DescMoneda: DesMoneda, TipoPago: this.defectotipopago,
            DescTipoPago: desTipoPago, Banco: this.banco, Cuenta: this.defectocuenta, DescCuenta: desCuenta, NroOperacion: this.nrooperacion,
            Fecha: this.formatfecha, Importe: this.importe, IdMoneda: this.defectomoneda, IdTipoPago: this.defectotipopago,
            Referencia: this.referencia
          });

          this.dataSourcePago.data = this.usuario;
          this.dataSourcePago.paginator = this.paginator;

          this.limpiar();
          // myForm.controls['defectocuenta'].clearValidators();
          // myForm.controls['defectotipopago'].clearValidators();
          // myForm.controls['importe'].clearValidators();
          // myForm.controls['nrooperacion'].clearValidators();
          // myForm.controls['fechaoperacion'].clearValidators();

        } else {
          this.toastr.error('El número de operación ya ha sido registrada.', 'Formas de pago');
        }
      } else {
        this.toastr.error('Por favor completar todos los campos.', 'Formas de pago');
      }

    }
    else {
      this.toastr.error('Por favor ingrese una fecha valida.', 'Formas de pago');
    }
  }
  onValidarIngresoTabla() {
    var valido = true;
    this.usuario.forEach(element => {
      if (element.NroOperacion == this.nrooperacion) {
        valido = false;
      }
    });
    return valido;
  }
  onDelete(i) {
    this.usuario.splice(i, 1);
    this.dataSourcePago.data = this.usuario;
  }
  aplicarPago() {
    if (this.dataSourcePago.data.length > 0) {
      if (this.obtenerSumaFormaPago()) {
        this.insertarFormaPago();

      } else {
        this.toastr.warning('Los pagos deben ser mayor  o igual a la planilla.', 'Formas de pago');
      }
    } else {
      this.toastr.warning('No ha agregado formas de pago', 'Formas de pago');
    }
  }
  obtenerSumaFormaPago() {
    let sumaImporte: number = 0;
    this.usuario.forEach(element => {
      sumaImporte = sumaImporte + Number(element.Importe);
    });
    console.log(sumaImporte);
    return sumaImporte >= Number(this.sumaplanilla);
  }
  insertarFormaPago() {
    var usercode = localStorage.getItem('currentUser');
    let jsonObj: any = JSON.parse(usercode); // string to generic object first
    let user: User = <User>jsonObj;
    var array = new Array<ListaConciliado>();
    this.usuario.forEach(element => {
      const formapago = new ListaConciliado();
      formapago.IdProceso = this.idproceso;
      formapago.TipoOperacion = 'FP';
      formapago.IdProducto = this.idproducto.toString();
      formapago.IdMoneda = element.Moneda;
      formapago.IdBanco = this.idbanco.toString();
      formapago.MontoFormaPago = element.Importe;
      formapago.IdTipoPago = element.TipoPago;
      formapago.IdCuentaBanco = element.Cuenta;
      formapago.NumeroOperacion = element.NroOperacion;
      formapago.FechaOperacion = element.Fecha;
      formapago.Referencia = element.Referencia;
      formapago.UserCode = user.id.toString();
      array.push(formapago);
    });
    this.service.insertarformapago(array).subscribe(
      s => {
        if (s.code == "0") {
          this.dialogRef.close();
          this.toastr.success(s.message, 'Conciliar Planillas');
        } else {
          this.toastr.error(s.message, 'Conciliar Planillas');
        }
        // this.toastr.success('Planilla se ha conciliado con éxito', 'Conciliar Planillas');
      },
      e => {
        this.toastr.error('Hubo problemas al conciliar las planillas', 'Conciliar Planillas');

      }
    );

  }
  obtenerFormaPago() {
    const cargarLote: Cargarlote = new Cargarlote();
    cargarLote.IdBanco = this.idbanco;
    cargarLote.IdProceso = this.idproceso;
    this.loading = true;
    this.service.ObtenerFormaPago(cargarLote).subscribe(
      s => {
        if (s.code === '0') {
          if (s.data.length > 0) {
            s.data.forEach(element => {
              console.log(element);
              const datePipe = new DatePipe('es-PE');
              //this.formatfecha = datePipe.transform(element.fechaOperacion, 'dd/MM/yyyy');
              this.defectomoneda = element.idMoneda;
              this.defectotipopago = element.idTipoPago;
              this.defectocuenta = element.idCuentaBanco;
              console.log(element);
              const DesMoneda: string = this.getNameOption(this.opcionMoneda, this.defectomoneda);
              const desTipoPago: string = this.getNameOption(this.opcionTipoPago, this.defectotipopago);

              let desCuenta: string = '';
              this.opcionCuenta.forEach(element => {
                if (element.idCuenta == this.defectocuenta.toString()) {
                  desCuenta = element.descripcionCuenta;
                }
              });

              //const desCuenta: string = this.getNameOption(this.opcionCuenta, this.defectocuenta);

              this.usuario.push({
                NLote: this.usuario.length + 1, Moneda: this.defectomoneda, DescMoneda: DesMoneda, TipoPago: this.defectotipopago,
                DescTipoPago: desTipoPago, Banco: this.banco, Cuenta: this.defectocuenta, DescCuenta: desCuenta,
                NroOperacion: element.numeroOperacion,
                Fecha: element.fechaOperacion.substring(0, 10), Importe: element.montoFormaPago, IdMoneda: this.defectomoneda, IdTipoPago: this.defectotipopago,
                Referencia: element.referencia
              });
              this.dataSourcePago.data = this.usuario;
              this.dataSourcePago.paginator = this.paginator;
              this.limpiar();
            });
          }
        } else {
          console.log(s.message);
        }
        this.loading = false;
      },
      e => {
        console.error(e);
        this.loading = false;
      }

    );
  }
  quotationNumberPressed(event: any) {
    if (!/[0-9]/.test(event.key) && event.key != 'Backspace' && event.key != 'Delete' && event.key != '/') {
      event.preventDefault();
    }
  }

  NumberPressed(event: any) {
    if (!/[0-9]/.test(event.key) && event.key != 'Backspace' && event.key != 'Delete' && event.value) {
      event.preventDefault();
    }
  }
  NumberPressedD(event: any) {
    if (!/[0-9]/.test(event.key) && event.key != 'Backspace' && event.key != 'Delete' && event.key != '.') {
      event.preventDefault();
    }
  }

  NumberPressedDOperacion(event: any) {
    if (!/[0-9]/.test(event.key) && event.key != 'Backspace' && event.key != 'Delete') {
      event.preventDefault();
    }
  }




}
