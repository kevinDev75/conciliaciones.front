import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatosConsultarAplicacion } from 'app/_models/conciliacionautomatica.model';
import { Producto } from '../_models/producto.model';
import { AppConfig } from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class ConciliacionAutomaticaService {

  private apiUrlListarProducto = this.config.apiUrl + '/api/producto/ListarProducto';
  //private apiUrlAplicarConciliacionAutomatica = 'http://localhost:2086/api/conciliacion/AplicarConciliacionAutomatica';
  private apiUrlAplicarConciliacionAutomatica =  this.config.apiUrl + '/api/conciliacion/AplicarConciliacionAutomatica';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private config: AppConfig) { }

  listarProductos() {
    return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
  }

  aplicarConciliacionAutomatica(datosConsultar: DatosConsultarAplicacion) {

    const json = JSON.stringify(datosConsultar);
    return this.http.post(this.apiUrlAplicarConciliacionAutomatica, json, { headers: this.headers }).map(res => res.json());
  }
}
