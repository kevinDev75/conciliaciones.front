import { Headers, Http } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
export class ProductoService {

    private apiUrlListarProducto = this.config.apiUrl + '/api/producto/ListarProducto';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarProductos() {
        return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
    }
}

