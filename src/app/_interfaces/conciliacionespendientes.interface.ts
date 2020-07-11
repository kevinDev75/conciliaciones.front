export interface IPlanillasPendientesResultado {
  IdPlanilla: string;
  FechaPlanilla: string;
  Monto: string;
  NumeroOperacion: string;
  Usuario: string;
}

export interface IDepositosPendientesResultado {
  IdDeposito: string;
  FechaDeposito: string;
  SaldoDeposito: string;
  NumeroOperacion: string;
  Usuario: string;
}

export interface IProducto {
    idproducto: string;
    descproducto: string;
}

export interface IDatosConsultarPendientes {
      IdProducto: number;
}
