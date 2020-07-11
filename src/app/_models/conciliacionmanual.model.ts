import {
    IConciliacionManualDepositos,
    IConciliacionManualPlanillas,
    IDatosConsultarDeposito,
    IDatosConsultarDepositoExtorno,
    IDatosConsultarPlanilla,
    IDatosAplicacionManual,
    IRespuesta,
    IConciliacionManualDepositosExtornos
// tslint:disable-next-line:import-spacing
}    from 'app/_interfaces/conciliacionmanual.interface';

export class ConciliacionManualPlanillas implements IConciliacionManualPlanillas {
  Id: string;
  idPlanilla: string;
  codigoCanal: string;
  descripcionCanal : string;
  NumeroOperacion: string;
  NumeroProforma: string;
  Monto: string;
  Selected: false;
}

export class ConciliacionManualDepositos implements IConciliacionManualDepositos {
  Id: string;
  idDeposito: string;
  NumeroOperacion: string;
  NumeroAbono: string;
  Monto: string;
  Extorno: string;
  Selected = false;
}

export class ConciliacionManualDepositosExtornos implements IConciliacionManualDepositosExtornos {  
  idDeposito: string;
  FechaDeposito: string;
  Monto: string;
  NumeroOperacion: string;
  Saldo: string;
  IdDepositoAsociado: string;
  Selected = false;
}

export class DatosConsultarPlanilla implements IDatosConsultarPlanilla {
  IdProducto = 0;
  IdCanal = 0;
  IdPlanilla='';
  FechaDesde: string;
  FechaHasta: string;
}

export class DatosConsultarDeposito implements IDatosConsultarDeposito {
  IdBanco = 0;
  IdCuenta = 0;
  IdMoneda = 0;
  IdProducto = 0;
  FechaDesde = '';
  FechaHasta = '';
  IdPlanilla=0 ;
}

export class DatosConsultarDepositoExt implements IDatosConsultarDepositoExtorno{
  NumeroOperacion ='';
  IdDeposito=0;
}

export class DatosAplicacionManual implements IDatosAplicacionManual {
  IdProducto = 0;
  FechaDesde = '';
  FechaHasta = '';
  IdPlanillas = '';
  IdDepositos = '';
  Usuario = '';
}

export class Respuesta implements IRespuesta {
  Resultado = 0;
  Mensaje = '';
}
