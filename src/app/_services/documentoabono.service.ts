import { Headers, Http, RequestOptions } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { DatosConsultaDocumento, DatosFacturaAbonos } from "../_models/documentoabono.model";

@Injectable({
    providedIn: 'root'
  })
export class DocumentoAbonoService {

    private apiUrlListarDocumentosAbonos = this.config.apiUrl + '/api/factura/ListarDocumentosAbonos';    
    private apiUrlGenerarFacturaAbono = this.config.apiUrl + '/api/factura/GenerarFacturaAbonos';
    private apiUrlValidarGeneracionFactura = this.config.apiUrl + '/api/factura/ValidarExisteFacturaDeposito';
    
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarDocumentosAbonos(datosConsultaDocumento: DatosConsultaDocumento) {
        
        const json = JSON.stringify(datosConsultaDocumento);
        return this.http.post(this.apiUrlListarDocumentosAbonos, json, { headers: this.headers }).map(res => res.json());
    }

    validaGeneracionFactura() {

        return this.http.get(this.apiUrlValidarGeneracionFactura, { headers: this.headers }).map(res => res.text());
    }

    generarFacturaAbonos(datosFacturaAbonos: DatosFacturaAbonos) {
        
        const json = JSON.stringify(datosFacturaAbonos);
        return this.http.put(this.apiUrlGenerarFacturaAbono, json, { headers: this.headers }).map(res => res.text());
    }
}