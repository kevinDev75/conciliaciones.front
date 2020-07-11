import { IDatosConsultarAplicacion, IRespuesta } from 'app/_interfaces/conciliacionautomatica.interface';

export class DatosConsultarAplicacion implements IDatosConsultarAplicacion {
  IdProducto = 0;
  FechaDesde = '';
  FechaHasta = '';
  Usuario = '';
}

export class Respuesta implements IRespuesta {
  Resultado = 0;
  Mensaje = '';
}
