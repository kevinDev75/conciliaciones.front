import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ɵConsole
} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDialog,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DialogControl } from 'app/conciliaciones/compartido/popupDialog.component';
import {
  DatosRespuestaGeneracionArchivo,
  DatosConsultaGeneracionArchivo
} from 'app/_models/generacionarchivos.model';
import { GeneracionArchivosService } from 'app/_services/generacionarchivos.service';

import * as moment from 'moment';
import { ExcelService } from 'app/_services/exportexcel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'app/_models/producto.model';
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
  selector: 'app-generacionarchivos',
  templateUrl: './generacionarchivos.component.html',
  styleUrls: ['./generacionarchivos.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class GeneracionarchivosComponent implements OnInit {
  fechaGeneracionSeleccionado: Date = null;
  fechaDesdeSeleccionado = '';
  fechaHastaSeleccionado = '';
  datosConsultaDocumentos: DatosConsultaGeneracionArchivo = null;
  public listaproductos: Producto[] = [];
  public idProductoSeleccionado = 0;
  enableFechaGeneracion = false;

  public listaDocumentos: DatosRespuestaGeneracionArchivo[] = [];

  // Constantes
  public respuestaOk = 'Ok';
  public respuestaCancel = 'Cancel';
  public respuestaOkCancelDialog = '';

  public existeData = false;

  public tipoDialogoConfirmar = 'Confirmar';
  public tipoDialogoLoad = 'Load';
  public tipoDialogoMensaje = 'Mensaje';
  public ColorButton: string;
  public maxDate: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnsDocumentoAbono = [
    'id_planilla',
    'descripcionProducto',
    'numeroOperacion',
    'fechaConciliacion',
    'montoBruto',
    'montoNeto',
    'comisionDirecta',
    'comisionIndirecta',
    'idDeposito',
    'idDepositoArchivo',
    'montoDeposito',
    'saldoDeposito',
    'fechaDeposito',
    'tipoMovimiento',
    'banco',
    'numeroCuenta'
  ];
  dataSourceDocumentoAbono = new MatTableDataSource<
    DatosRespuestaGeneracionArchivo
  >(this.listaDocumentos);

  constructor(
    private service: GeneracionArchivosService,
    private serviceExporta: ExcelService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.fechaGeneracion();
    }, 500);

    this.service.listarProducto().subscribe(
      s => {
        this.listaproductos = s;
        this.idProductoSeleccionado = this.listaproductos[0].idProducto;
      },
      e => {
        console.log(e);
      }
    );
  }

  fechaGeneracion() {
    this.spinner.show();

    this.service.fechaGeneracion().subscribe(
      s => {
        let af = s.fechaGeneracion.split('/');

        this.enableFechaGeneracion = s.editable;
        this.fechaGeneracionSeleccionado = new Date(
          parseInt(af[2]),
          parseInt(af[1]) - 1,
          parseInt(af[0])
        );

        this.spinner.hide();
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );
  }

  buscarPlanillas() {
    this.spinner.show();
    const datosConsulta = new DatosConsultaGeneracionArchivo();

    datosConsulta.fechaGeneracion = moment(
      this.fechaGeneracionSeleccionado
    ).format('DD/MM/YYYY');
    datosConsulta.fechaDesde = moment(this.fechaDesdeSeleccionado).format(
      'DD/MM/YYYY'
    );
    datosConsulta.fechaHasta = moment(this.fechaHastaSeleccionado).format(
      'DD/MM/YYYY'
    );
    datosConsulta.idProducto = this.idProductoSeleccionado;

    this.existeData = false;
    // console.log(datosConsulta);
    this.service.consultarArchivos(datosConsulta).subscribe(
      s => {
        console.log(s);
        this.listaDocumentos = s;

        const DescriptProduct = this.listaproductos.filter(x => x.idProducto === datosConsulta.idProducto).shift().descProducto;
        if (this.listaDocumentos.length > 0)  {
          this.listaDocumentos.forEach(item => {
            item.descripcionProducto = DescriptProduct;
        });
        }

        const _idPlanillas = this.listaDocumentos.filter(x => x.id_dg_estado_planilla !== '1107').map(e => e.id_planilla).join(',');
        console.log(_idPlanillas);
        this.dataSourceDocumentoAbono = new MatTableDataSource<
          DatosRespuestaGeneracionArchivo
        >(this.listaDocumentos);
        this.dataSourceDocumentoAbono.paginator = this.paginator;
        this.datosConsultaDocumentos = datosConsulta;
        this.datosConsultaDocumentos.id_planillas = _idPlanillas;
         console.log(this.datosConsultaDocumentos);
        this.existeData = this.listaDocumentos.length > 0;
        this.spinner.hide();
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );
  }

  descargarPlanillas() {
    this.serviceExporta.exportAsExcelFile(
      this.listaDocumentos,
      'Generacion_Archivos'
    );
  }

  procesarPlanillas() {
    const dialogConfirmRef = this.dialog.open(DialogControl, {
      width: '300px',
      data: {
        tipoDialogo: this.tipoDialogoConfirmar,
        respuestaOkCancelDialog: this.respuestaOkCancelDialog
      }
    });

    dialogConfirmRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.respuestaOkCancelDialog === this.respuestaOk) {
          this.onProcesarPlanillas();
        }
      }
    });
  }

  onProcesarPlanillas() {
    this.spinner.show();
    this.service.procesarArchivos(this.datosConsultaDocumentos).subscribe(
      s => {
        // console.log('procesarArchivos', s);

        const dialogMensaje = this.dialog.open(DialogControl, {
          width: '300px',
          data: {
            tipoDialogo: this.tipoDialogoMensaje,
            mensajeDialogo: s.message
          }
        });

        if (s.success === true) {
          dialogMensaje.afterClosed().subscribe(mResult => {
            // console.log('limpiar búsqueda');
            this.buscarPlanillas();
          });
        }

        this.spinner.hide();
      },
      e => {
        console.log(e);
        this.spinner.hide();
      }
    );
  }
}
