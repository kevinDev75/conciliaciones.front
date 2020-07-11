import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
export class GeneracionArchivosService {
    private apiUrlListarTipoArchivo =  this.config.apiUrl + '/api/tipoarchivo/ListarTipoArchivo';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarTipoArchivo() {
        return this.http.post(this.apiUrlListarTipoArchivo, {}, { headers: this.headers }).map(res => res.json());
    }
}
