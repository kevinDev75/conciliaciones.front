export interface IConciliacionManualPlanillas {
    Id: string;
    idPlanilla: string;
    codigoCanal : string;
    descripcionCanal : string;
    NumeroOperacion: string;
    NumeroProforma: string;
    Monto: string;
    Selected: boolean;
}

export interface IConciliacionManualDepositos {
    Id: string;
    idDeposito: string;
    NumeroOperacion: string;
    NumeroAbono: string;
    Monto: string;
    Extorno: string;
    Selected: boolean;
}

export interface IConciliacionManualDepositosExtornos {  
  idDeposito: string;
  FechaDeposito: string;
  Monto: string;
  NumeroOperacion: string;
  Saldo: string;
  IdDepositoAsociado: string;  
  Selected: boolean;
}

export interface IDatosConsultarPlanilla {
    IdProducto: number;
    IdCanal : number;
    IdPlanilla:string;
    FechaDesde: string;
    FechaHasta: string;
}

export interface IDatosConsultarDeposito {
  IdBanco: number;
  IdCuenta: number;
  IdMoneda: number;
  IdProducto: number;
  FechaDesde: string;
  FechaHasta: string;
}

export interface IDatosConsultarDepositoExtorno {  
  NumeroOperacion: string;  
  IdDeposito:number;
}

export interface IDatosAplicacionManual {
  IdProducto: number;
  FechaDesde: string;
  FechaHasta: string;
  IdPlanillas: string;
  IdDepositos: string;
  Usuario: string;
}

export interface IRespuesta {
  Resultado: number;
  Mensaje: string;
}

