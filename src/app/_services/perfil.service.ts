import { Injectable } from '@angular/core';
import { PerfilResultado, DatosConsultarPerfil, RecursoProceso } from '../_models/perfil.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { TipoPerfil } from '../_models/entidad.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // headers =  new Headers({ 'Content-Type': 'application/json' });
  selectedPerfil: PerfilResultado;
  ListaPerfil: PerfilResultado[];
  ListaTipoPerfil: TipoPerfil[];

  private apiUrlListarTipoPerfil = this.config.apiUrl + '/api/perfil/ListarTipoPerfil'
  private apiUrlListarPerfiles = this.config.apiUrl + '/api/perfil/ConsultarPerfiles'
  private apiUrlListarRecursosPerfil = this.config.apiUrl + '/api/perfil/ListarRecursoPerfil'
  private apiUrlRegistrarPerfil = this.config.apiUrl + '/api/perfil/RegistrarPerfil'
  private apiUrlActualizarPerfil = this.config.apiUrl + '/api/perfil/ActualizarPerfil'
  private apiUrlBorrarPerfil = this.config.apiUrl + '/api/perfil/Delete'
  private apiUrlListarUsuarioPerfil = this.config.apiUrl + '/api/perfil/ListarUsuarioPerfil'

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private config: AppConfig) { }

  deletePerfil(recursoProceso: RecursoProceso) {
    return this.http.post(this.apiUrlBorrarPerfil, JSON.stringify(recursoProceso), { headers: this.headers }).map(res => res.json());
  }

  listarTipoPerfil() {
    return this.http.post(this.apiUrlListarTipoPerfil, {}, { headers: this.headers }).map(res => res.json());
  }

  BuscarPerfiles(datosConsultar: DatosConsultarPerfil) {
    return this.http.post(this.apiUrlListarPerfiles, JSON.stringify(datosConsultar), { headers: this.headers }).map(res => res.json());
  }

  BuscarRecursosPerfil(idPerfil: number) {
    return this.http.post(this.apiUrlListarRecursosPerfil, idPerfil, { headers: this.headers }).map(res => res.json());
  }

  RegistrarPerfil(recursoProceso: RecursoProceso) {
    return this.http.post(this.apiUrlRegistrarPerfil, JSON.stringify(recursoProceso), { headers: this.headers }).map(res => res.json());
  }

  ActualizarPerfil(recursoProceso: RecursoProceso) {
    return this.http.post(this.apiUrlActualizarPerfil, JSON.stringify(recursoProceso), { headers: this.headers }).map(res => res.json());
  }

  ListarUsuarioPerfil(idPerfil: number) {
    return this.http.post(this.apiUrlListarUsuarioPerfil, idPerfil, { headers: this.headers }).map(res => res.json());
  }

  }



