export interface IFacturaDeposito {
    idFacturaDeposito: number;
    idProducto: number;
    numeroFactura: number;
    montoTotal: number;
    vcUsuarioCreacion: string;
    dtFechaCreacion: string;
    vcUsuarioModificacion: string;
    dtFechaModificacion: string;
    iddgEstado: number;
    indGeneracion : string;
}

export interface IDetalleFacturaDeposito {
    idDetalleFacturaDeposito: number;
    idFacturaDeposito: number;
    idDeposito: number;
    monto: number;
    idTipoMedioPago: number;
    vcUsuarioCreacion: string;
    dtFechaCreacion: string;
    vcUsuarioModificacion: string;
    dtFechaModificacion: string;
    iddgEstado: number;
    iddgEstadoDeposito : number;
}

export interface IDocumentosAbonos {
    numeroFactura: string;
    fechaFactura: string;
    montoFactura: number;
    idNotaCredito: string;
    fechaNotaCredito: string;
    estado: string;
}

export interface IDatosFacturaAbonos {
    idProducto : number;
    usuario : string;
}

export interface IDatosConsultaDocumento {
    numeroFactura: string;
    fechaDesde: string;
    fechaHasta: string;
}
