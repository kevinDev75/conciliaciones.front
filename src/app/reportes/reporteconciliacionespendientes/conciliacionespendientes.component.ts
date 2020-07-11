import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  Injectable
} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConciliacionesPendientesService } from '../../_services/conciliacionespendientes.service';
import {
  DatosConsultarPendientes,
  DepositosPendientesResultado,
  PlanillasPendientesResultado
} from '../../_models/conciliacionespendientes.model';
import { Producto } from '../../_models/producto.model';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
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

import { FormControl } from '@angular/forms';
import { DialogControl } from '../../conciliaciones/compartido/popupDialog.component';

import { ExcelService } from '../../_services/exportexcel.service';
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
  // tslint:disable-next-line:component-selector
  selector: 'conciliacionespendientes',
  templateUrl: './conciliacionespendientes.component.html',
  styleUrls: ['./conciliacionespendientes.component.scss'],
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
export class ConciliaionesPendientesComponent implements OnInit {
  public listaplanillaspendientes: PlanillasPendientesResultado[] = [];
  public listadepositospendientes: DepositosPendientesResultado[] = [];
  public listaproductos: Producto[] = [];
  DatosConsultaPendiente = new DatosConsultarPendientes();

  public idProductoSeleccionado = 0;
  public fechaDesdeSeleccionado = '';
  public fechaHastaSeleccionado = '';

  public tipoDialogoLoad = 'Load';
  public isRequired = true;
  public isRequiredFi = true;
  date = new FormControl(new Date());

  // tslint:disable-next-line:max-line-length
  // displayedColumnsPlanilla = ['idPlanilla', 'fechaPlanilla', 'totalPlanilla', 'numeroOperacion', 'idDeposito', 'fechaDeposito', 'totalDeposito'];
  // dataSourcePlanilla = new MatTableDataSource<PlanillasProcesadasResultado>(this.listaplanillasprocesadas);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: string;
  public ColorButton: string;

  constructor(
    private service: ConciliacionesPendientesService,
    public dialog: MatDialog,
    private serviceExporta: ExcelService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.service.listarProductos().subscribe(
      s => {
        // console.log(s);
        this.listaproductos = s;
      },
      e => {
        console.log(e);
      }
    );
  }

  onExportar() {
    this.spinner.show();
    const datosConsultaPendientes = new DatosConsultarPendientes();
    datosConsultaPendientes.IdProducto = this.idProductoSeleccionado;

    // const planilla = new PlanillasPendientesResultado();
    // const deposito = new DepositosPendientesResultado();

    this.service
      .consultarPlanillasPendientes(datosConsultaPendientes)
      .subscribe(
        s => {
          // console.log(s);
          this.listaplanillaspendientes = s;
          // console.log('Datos planillas');
          // console.log(this.listaplanillaspendientes);

          this.service
            .consultarDepositosPendientes(datosConsultaPendientes)
            .subscribe(
              r => {
                // console.log(r);
                this.listadepositospendientes = r;
                // console.log('Datos depositos');
                // console.log(this.listadepositospendientes);

                this.serviceExporta.exportAsExcelReporteFile(
                  this.listaplanillaspendientes,
                  this.listadepositospendientes,
                  'Reporte'
                );
                this.spinner.hide();
              },
              e => {
                console.log(e);
                this.spinner.hide();
              }
            );
        },
        e => {
          console.log(e);
          this.spinner.hide();
        }
      );
  }

  enabledButtonProceso() {
    if (this.idProductoSeleccionado === 0) {
      this.ColorButton = 'white';
    } else {
      this.ColorButton = 'purple';
    }
    return this.idProductoSeleccionado === 0;
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
