import {
  IDatosConsultaGeneracionArchivo,
  IDatosRespuestaGeneracionArchivo,
  IDatosProcesoGeneracionArchivo
} from 'app/_interfaces/generacionarchivos.interface';

export class DatosConsultaGeneracionArchivo
  implements IDatosConsultaGeneracionArchivo {
  idProducto: number;
  fechaDesde: string;
  fechaHasta: string;
  fechaGeneracion: string;
  id_planillas: string;
}

export class DatosRespuestaGeneracionArchivo
  implements IDatosRespuestaGeneracionArchivo {
  id_planilla: number;
  descripcionProducto: string;
  numeroOperacion: string;
  fechaConciliacion: string;
  montoBruto: number;
  montoNeto: number;
  comisionDirecta: number;
  comisionIndirecta: number;
  idDeposito: string;
  idDepositoArchivo: string;
  montoDeposito: number;
  saldoDeposito: number;
  // nombreArchivo: string;
  fechaDeposito: string;
  // No se encontraban en el Excel
  tipoMovimiento: string;
  banco: string;
  numeroCuenta: string;
  id_dg_estado_planilla: string;
}

export class DatosProcesoGeneracionArchivo
  implements IDatosProcesoGeneracionArchivo {
  message: string;
  success: boolean;
}
