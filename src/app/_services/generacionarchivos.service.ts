import { Headers, Http } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { DatosConsultaArchivos } from "../_models/generacionexactus.model";
import { DatosConsultaGeneracionArchivo } from "app/_models/generacionarchivos.model";

@Injectable({
    providedIn: 'root'
})
export class GeneracionArchivosService {
    private apiUrlListarProducto =
    this.config.apiUrl + '/api/producto/ListarProducto';
    private apiUrlFechaGeneracion = this.config.apiUrl + '/api/generacionarchivos/FechaGeneracion';
    private apiUrlGenerarArchivos = this.config.apiUrl + '/api/generacionarchivos/GenerarArchivos';
    private apiUrlProcesarArchivos = this.config.apiUrl + '/api/generacionarchivos/ProcesarArchivos';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    fechaGeneracion() {
        const json = JSON.stringify({});

        return this.http.post(this.apiUrlFechaGeneracion, null, { headers: this.headers }).map(res => res.json());
    }

    consultarArchivos(datosConsulta: DatosConsultaGeneracionArchivo) {
        const json = JSON.stringify(datosConsulta);
        return this.http.post(this.apiUrlGenerarArchivos, json, { headers: this.headers }).map(res => res.json());
    }

    procesarArchivos(datosConsulta: DatosConsultaGeneracionArchivo) {
        const json = JSON.stringify(datosConsulta);
        return this.http.post(this.apiUrlProcesarArchivos, json, { headers: this.headers }).map(res => res.json());
    }

    listarProducto() {
        return this.http
          .post(this.apiUrlListarProducto, {}, { headers: this.headers })
          .map(res => res.json());
      }
}

