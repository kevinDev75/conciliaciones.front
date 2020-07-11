export interface IDatosConsultarAplicacion {
  IdProducto: number;
  FechaDesde: string;
  FechaHasta: string;
  Usuario : string;
}


export interface IRespuesta
{
  Resultado: number;
  Mensaje: string;
}
