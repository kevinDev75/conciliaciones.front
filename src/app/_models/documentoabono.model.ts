import { IFacturaDeposito, IDetalleFacturaDeposito, IDocumentosAbonos, IDatosConsultaDocumento, IDatosFacturaAbonos } from "../_interfaces/documentoabono.interface";

export class FacturaDeposito implements IFacturaDeposito {
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

export class DetalleFacturaDeposito implements IDetalleFacturaDeposito {
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

export class DocumentosAbonos implements IDocumentosAbonos {
    numeroFactura: string;
    fechaFactura: string;
    montoFactura: number;
    idNotaCredito: string;
    fechaNotaCredito: string;
    estado: string;
}

export class DatosFacturaAbonos implements IDatosFacturaAbonos {
    idProducto : number;
    usuario : string;
}

export class DatosConsultaDocumento implements IDatosConsultaDocumento {
    numeroFactura: string;
    fechaDesde: string;
    fechaHasta: string;
}