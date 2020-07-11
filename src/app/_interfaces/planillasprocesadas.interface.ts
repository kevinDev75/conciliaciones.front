export interface IPlanillasProcesadasResultado {
  codigoCanal : string;
  descripcionCanal : string;
  IdPlanilla: string;
  FechaPlanilla: string;
  TotalPlanilla: string;
  // IdDeposito: string;
  FechaDeposito: string;
  TotalDeposito: string;
  ImporteDeposito: string;
  SaldoDeposito: string;
  NumeroOperacion: string;
  Usuario: string;
  Banco: string;
  FechaConciliacion: string;
}

export interface IProducto {
    idproducto: string;
    descproducto: string;
}

export interface IDatosConsultarPlanilla {
    IdProducto: number;
    FechaDesde: string;
    FechaHasta: string;
    IdCanal: number;
}
