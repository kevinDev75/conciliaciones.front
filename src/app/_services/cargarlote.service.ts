import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Producto } from '../_models/producto.model';
import { Banco } from '../_models/entidad.model';
import { Moneda } from '../_models/moneda.model';
import { AppConfig } from '../app.config';
import { Cargarlote, BuscarPlanilla, ListaConciliado } from 'app/_models/cargarlote.model';


@Injectable({
  providedIn: 'root'
})
export class CargarloteService {
  private apiUrlListarProducto = this.config.apiUrl + '/api/producto/listarproductosctr';
  // private apiUrlListarMoneda = this.config.apiUrl + '/api/moneda/ListarMoneda';
  private apiUrlListarBanco = this.config.apiUrl + '/api/cobranza/listarbancos';
  private apiUrlListarTipoPago = this.config.apiUrl + '/api/cobranza/ListarTipoPago';
  private apiUrlValidarTrama = this.config.apiUrl + '/api/Cobranza/ValidarTrama';
  private apiUrlBuscarPlanilla = this.config.apiUrl + '/api/Cobranza/ObtenerTrama';
  private apiUrlInsertarFormaPago = this.config.apiUrl + '/api/Cobranza/InsertarFacturaFormaPago';
  private apiUrlValPlanillaFactura = this.config.apiUrl + '/api/Cobranza/ValidarPlanillaFactura';
  private apiUrlObtenerFormaPago = this.config.apiUrl + '/api/Cobranza/ObtenerFormaPago';
  private apiUrlObtenerListaCuentas = this.config.apiUrl + '/api/Cobranza/ListarCuentas';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private config: AppConfig) { }





  listarProducto() {
    return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
  }
  listarCuenta(Idbanco: number) {
    return this.http.get(this.apiUrlObtenerListaCuentas + '?idBanco=' + Idbanco, { headers: this.headers }).map(res => res.json());
  }

  listarBanco() {
    return this.http.post(this.apiUrlListarBanco, {}, { headers: this.headers }).map(res => res.json());
  }
  listarTipoPago() {
    return this.http.post(this.apiUrlListarTipoPago, {}, { headers: this.headers }).map(res => res.json());
  }
  procesarTrama(cargarlote: Cargarlote) {
    const json = JSON.stringify(cargarlote);
    console.log(json);
    return this.http.post(this.apiUrlValidarTrama, json, { headers: this.headers }).map(res => res.json());
  }
  obtenerTrama(buscarplanilla: BuscarPlanilla) {
    const json = JSON.stringify(buscarplanilla);
    return this.http.post(this.apiUrlBuscarPlanilla, json, { headers: this.headers }).map(res => res.json());
  }
  insertarformapago(listado: Array<ListaConciliado>) {
    const json = JSON.stringify(listado);
    return this.http.post(this.apiUrlInsertarFormaPago, json, { headers: this.headers }).map(res => res.json());
  }
  ValidarPlanillaFacturas(Listado: ListaConciliado) {
    const json = JSON.stringify(Listado);
    return this.http.post(this.apiUrlValPlanillaFactura, json, { headers: this.headers }).map(res => res.json());
  }
  ObtenerFormaPago(cargarlote: Cargarlote) {
    const json = JSON.stringify(cargarlote);
    console.log(json);
    return this.http.post(this.apiUrlObtenerFormaPago, json, { headers: this.headers }).map(res => res.json());
  }

}
