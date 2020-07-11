import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Headers, Http } from '@angular/http';
import { ParametersRecibo, Transaciones } from 'app/_models/Cuponera.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CuponeraService {


  private apiUrlObtenerTransacciones = this.config.apiUrl + '/api/Cuponera/ListarTransaciones';
  private apiUrlObtenerInfoRecibo = this.config.apiUrl + '/api/Cuponera/GetInfoRecibo';
  private apiUrlObtenerPreviewCupon = this.config.apiUrl + '/api/Cuponera/GetInfoCuponPreview';
  private apiUrlGenerarCupon = this.config.apiUrl + '/api/Cuponera/GenerateCupon';
  private apiUrlGetInfoCupon = this.config.apiUrl + '/api/Cuponera/GetInfoCuponera';
  private apiUrlGetInfoCuponDetail = this.config.apiUrl + '/api/Cuponera/GetInfoCuponeraDetail';
  private apiUrlAnularCupon = this.config.apiUrl + '/api/Cuponera/AnnulmentCupon';


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private config: AppConfig) { }


  ListarTransaciones() {
    return this.http.get(this.apiUrlObtenerTransacciones, { headers: this.headers }).map(res => res.json());
  }
  ObtenerIfoRecibo(parameters: ParametersRecibo) {
    console.log(parameters);
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlObtenerInfoRecibo, json, { headers: this.headers }).map(res => res.json());
  }
  ObtenerPreviewCupon(parameters: ParametersRecibo) {
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlObtenerPreviewCupon, json, { headers: this.headers }).map(res => res.json());
  }
  GenerarCupon(parameters: ParametersRecibo) {
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlGenerarCupon, json, { headers: this.headers }).map(res => res.json());
  }
  ObtenerInfoCupon(parameters: ParametersRecibo) {
    console.log(parameters);
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlGetInfoCupon, json, { headers: this.headers }).map(res => res.json());
  }
  ObtenerInfoCuponDetail(parameters: ParametersRecibo) {
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlGetInfoCuponDetail, json, { headers: this.headers }).map(res => res.json());
  }
  AnularCupon(parameters: ParametersRecibo) {
    const json = JSON.stringify(parameters);
    console.log(json);
    return this.http.post(this.apiUrlAnularCupon, json, { headers: this.headers }).map(res => res.json());
  }



}
