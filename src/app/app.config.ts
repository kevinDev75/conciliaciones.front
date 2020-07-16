import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppConfig {
  //public readonly apiUrl = 'http://localhost:2086/';
  // public readonly apiUrl = 'http://localhost:2086';

  public readonly apiUrl = "http://10.10.1.56/conciliacionesBancaria";

  // public readonly apiUrl = 'http://10.10.1.56/ConciliacionRESTDESA';
  // public readonly apiUrl = 'http://190.216.170.173/ConciliacionRESTDESA';
  // public readonly apiUrl = 'http://172.23.2.104/ConciliacionRESTPROD'; // PRODUCCIÓN
}
