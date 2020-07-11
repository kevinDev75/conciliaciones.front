import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';

import { PlanillasPendientesResultado, DepositosPendientesResultado, DatosConsultarPendientes  }
       from '../_models/conciliacionespendientes.model';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionesPendientesService {
    private apiUrlListarProducto = this.config.apiUrl + '/api/producto/ListarProducto';
    private apiUrlReportePlanillasPendientes = this.config.apiUrl + '/api/reporte/ReportePlanillasPendientes';
    private apiUrlReporteDepositosPendientes = this.config.apiUrl + '/api/reporte/ReporteDepositosPendientes';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarProductos() {
      return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
    }

    consultarPlanillasPendientes(datosConsultar: DatosConsultarPendientes) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(this.apiUrlReportePlanillasPendientes, JSON.stringify(datosConsultar), { headers: this.headers }).map(res => res.json());
    }

    consultarDepositosPendientes(datosConsultar: DatosConsultarPendientes) {
      // tslint:disable-next-line:max-line-length
      return this.http.post(this.apiUrlReporteDepositosPendientes, JSON.stringify(datosConsultar), { headers: this.headers }).map(res => res.json());
  }


}
