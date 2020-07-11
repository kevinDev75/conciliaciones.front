import {
    IProducto,
    IPlanillasPendientesResultado,
    IDepositosPendientesResultado,
    IDatosConsultarPendientes
} from '../_interfaces/conciliacionespendientes.interface';

export class PlanillasPendientesResultado implements IPlanillasPendientesResultado {
  IdPlanilla    = '';
  FechaPlanilla = '';
  Monto         = '';
  NumeroOperacion = '';
  Usuario       = '';
}

export class DepositosPendientesResultado implements IDepositosPendientesResultado {
  IdDeposito      = '';
  FechaDeposito   = '';
  SaldoDeposito   = '';
  NumeroOperacion = '';
  Usuario         = '';
}


export class DatosConsultarPendientes implements IDatosConsultarPendientes {
    IdProducto = 0;
}

