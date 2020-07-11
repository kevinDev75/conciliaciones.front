import {
    IProducto,
    IPlanillasProcesadasResultado,
    IDatosConsultarPlanilla
} from '../_interfaces/planillasprocesadas.interface';

export class PlanillasProcesadasResultado implements IPlanillasProcesadasResultado {
  codigoCanal         = '';
  descripcionProducto = '';
  descripcionCanal    = '';
  IdPlanilla          = '';
  FechaPlanilla       = '';
  TotalPlanilla       = '';
  // IdDeposito          = '';
  FechaDeposito       = '';
  TotalDeposito       = '';
  ImporteDeposito     = '';
  SaldoDeposito       = '';
  NumeroOperacion     = '';
  Usuario             = '';
  EstadoPlanilla      = '';
  Banco               = '';
  FechaConciliacion   = '';
  IdEstadoPlanilla    = '';
}

export class DatosConsultarPlanilla implements IDatosConsultarPlanilla {
    IdProducto = 0;
    IdCanal = 0;
    FechaDesde = '';
    FechaHasta = '';
    IdBanco = 0;
    IdCuenta = 0;
}
