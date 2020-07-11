import { Headers, Http } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
  })
export class CanalesService {

    private apiUrlListarCanal = this.config.apiUrl + '/api/canal/ListarCanal';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: AppConfig) { }

    listarCanal() {
        return this.http.post(this.apiUrlListarCanal, {}, { headers: this.headers }).map(res => res.json());
    }    
}

