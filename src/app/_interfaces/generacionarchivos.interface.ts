export interface IDatosConsultaGeneracionArchivo {
  idProducto: number;
  fechaDesde: string;
  fechaHasta: string;
  fechaGeneracion: string;
  id_planillas: string;
}

export interface IDatosRespuestaGeneracionArchivo {
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
  fechaDeposito: string;
  tipoMovimiento: string;
  banco: string;
  numeroCuenta: string;
  id_dg_estado_planilla: string;
}

export interface IDatosProcesoGeneracionArchivo {
  message: string;
  success: boolean;
}
