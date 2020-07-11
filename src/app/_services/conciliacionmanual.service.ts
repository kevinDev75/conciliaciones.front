import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {
  DatosConsultarDeposito,
  DatosConsultarPlanilla,
  DatosAplicacionManual,
  Respuesta,
  DatosConsultarDepositoExt
} from '../_models/conciliacionmanual.model';
import { Producto } from '../_models/producto.model';
import { Banco, Cuenta } from '../_models/entidad.model';
import { Moneda } from '../_models/moneda.model';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ConciliacionManualService {
  private apiUrlListarProducto =
    this.config.apiUrl + '/api/producto/ListarProducto';
  private apiUrlListarMoneda = this.config.apiUrl + '/api/moneda/ListarMoneda';
  private apiUrlListarBanco = this.config.apiUrl + '/api/entidad/ListarEntidad';
  private apiUrlListarCuentaxBanco =
    this.config.apiUrl + '/api/entidad/ListarCuentasxBanco';
  private apiUrlListarPlanillasPendientes =
    this.config.apiUrl + '/api/planilla/ConsultarPlanillasPendientes';
  private apiUrlListarDepositosPendientes =
    this.config.apiUrl + '/api/deposito/ConsultarDepositosPendientes';
  private apiUrlListarDepositosExtornados =
    this.config.apiUrl + '/api/deposito/ConsultarDepositosExtornados';
  private apiUrlconciliarPlanillasManual =
    this.config.apiUrl + '/api/conciliacion/AplicarConciliacionManual';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private config: AppConfig) {}

  listarProducto() {
    return this.http
      .post(this.apiUrlListarProducto, {}, { headers: this.headers })
      .map(res => res.json());
  }

  listarBanco(bTodos: boolean) {
    return this.http
      .post(this.apiUrlListarBanco, bTodos, { headers: this.headers })
      .map(res => res.json());
  }

  listarMoneda() {
    return this.http
      .post(this.apiUrlListarMoneda, {}, { headers: this.headers })
      .map(res => res.json());
  }

  listarCuentaxBanco(idBanco: number) {
    return this.http
      .post(this.apiUrlListarCuentaxBanco, idBanco, { headers: this.headers })
      .map(res => res.json());
  }

  consultarPlanillasPendientes(datosConsultar: DatosConsultarPlanilla) {
    const json = JSON.stringify(datosConsultar);
    return this.http
      .post(this.apiUrlListarPlanillasPendientes, json, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  consultarDepositoPendientes(datosConsultar: DatosConsultarDeposito) {
    // console.log('FechaDesde => ' + datosConsultar.FechaDesde);
    // console.log('FechaHasta => ' + datosConsultar.FechaHasta);
    const json = JSON.stringify(datosConsultar);
    return this.http
      .post(this.apiUrlListarDepositosPendientes, json, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  consultarDepositoExtornados(datosConsultar: DatosConsultarDepositoExt) {
    const json = JSON.stringify(datosConsultar);
    return this.http
      .post(this.apiUrlListarDepositosExtornados, json, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  aplicarConciliacionManual(datosConsultar: DatosAplicacionManual) {
    // console.log('IdPlanillas => ' + datosConsultar.IdPlanillas);
    // console.log('IdDepositos => ' + datosConsultar.IdDepositos);
    const json = JSON.stringify(datosConsultar);
    return this.http
      .post(this.apiUrlconciliarPlanillasManual, json, {
        headers: this.headers
      })
      .map(res => res.json());
  }
}
