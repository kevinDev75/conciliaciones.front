import { Headers, Http } from "@angular/http";
import { DatosConsultaPlanilla } from "../_models/planillasimportadas.model";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
export class PlanillasImportadasService {

    private apiUrlListarProducto = this.config.apiUrl + '/api/producto/ListarProducto';
    private apiUrlImportarPlanilla =  this.config.apiUrl + '/api/planilla/ImportarPlanilla';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarProductos() {
        return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
    }

    importarPlanillas(datosConsultaPlanilla: DatosConsultaPlanilla) {

        const json = JSON.stringify(datosConsultaPlanilla);

        return this.http.post(this.apiUrlImportarPlanilla, json, { headers: this.headers }).map(res => res.json());
    }
}

