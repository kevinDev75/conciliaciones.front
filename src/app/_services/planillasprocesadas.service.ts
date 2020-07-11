import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';

import { PlanillasProcesadasResultado, DatosConsultarPlanilla } from '../_models/planillasprocesadas.model';

@Injectable({
  providedIn: 'root'
})
export class PlanillasProcesadasService {
    private apiUrlListarProducto = this.config.apiUrl + '/api/producto/ListarProducto';
    private apiUrlConsultarPlanillasProcesadas = this.config.apiUrl + '/api/planilla/ConsultarPlanillasProcesadas';
    private apiUrlValidarFacturaPlanilla = this.config.apiUrl + '/api/planilla/ValidarFacturaDePlanilla';
    private apiUrlExtornoConciliacion = this.config.apiUrl + '/api/conciliacion/RevertirConciliacion';
    private apiUrlListarBanco=this.config.apiUrl + '/api/entidad/ListarEntidad';
    private apiUrlListarCuentaxBanco=this.config.apiUrl+'/api/entidad/ListarCuentasxBanco';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarProductos() {
      return this.http.post(this.apiUrlListarProducto, {}, { headers: this.headers }).map(res => res.json());
    }

    consultarPlanillasProcesadas(datosConsultar: DatosConsultarPlanilla) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(this.apiUrlConsultarPlanillasProcesadas, JSON.stringify(datosConsultar), { headers: this.headers }).map(res => res.json());
    }

    listarBanco(bTodos :boolean){      
      return this.http.post(this.apiUrlListarBanco,bTodos,{headers: this.headers}).map(res=>res.json());            
    }

    listarCuentaXBanco(idBanco: number){
      return this.http.post(this.apiUrlListarCuentaxBanco, idBanco,{headers :this.headers}).map(res=>res.json());
    }

    revertirConciliacion(idPlanilla: number) {
      // tslint:disable-next-line:max-line-length
      return this.http.post(this.apiUrlExtornoConciliacion, JSON.stringify(idPlanilla), { headers: this.headers }).map(res => res.json());
  }

  validarFacturaDePlanilla(idPlanilla: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.apiUrlValidarFacturaPlanilla, JSON.stringify(idPlanilla), { headers: this.headers }).map(res => res.json());
}

}
