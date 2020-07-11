import { Headers, Http } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { DatosConsultaArchivos } from "../_models/generacionexactus.model";

@Injectable({
    providedIn: 'root'
  })
export class GeneracionExactusService {
    
    private apiUrlGenerarArchivos =  this.config.apiUrl + '/api/generacionexactus/GenerarArchivos';
    private apiUrlListarTipoArchivo =  this.config.apiUrl + '/api/tipoarchivo/ListarTipoArchivo';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarTipoArchivo() {
        return this.http.post(this.apiUrlListarTipoArchivo, {}, { headers: this.headers }).map(res => res.json());
    }    

    generarArchivos(datosConsultaArchivos: DatosConsultaArchivos) {

        const json = JSON.stringify(datosConsultaArchivos);

        return this.http.post(this.apiUrlGenerarArchivos, json, { headers: this.headers }).map(res => res.json());
    }
}

