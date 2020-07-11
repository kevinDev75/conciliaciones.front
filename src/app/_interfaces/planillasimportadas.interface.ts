export interface IPlanillaResultado {
    idPlanilla: number;
    vcDescripcion: string;
    dcTotal: string;
    dtFechaPlanilla: string;
    idCanal: number;
    idPuntoventa: number;
    iddgEstadoPlanilla: number;
    iddgEstadoProenv: number;
    iddgEstado: number;
    idProducto: number;
    dtFechacreacion: string;
    vcUsuariocreacion: string;
    dtFechamodificacion: string;
    vcUsuariomodificacion: string;
    detallePlanillacobro: IDetallePlanillaCobroResultado[];
    detallePlanillapago: IDetallePlanillaPagoResultado[];
}

export interface IDetallePlanillaCobroResultado {
    idDetallePlanillaCobro: number;
    idPlanilla: number;
    idRamo: number;
    idProducto: number;
    vcNumeropoliza: string;
    vcNumerocertificado: string;
    idProforma: number;
    iddgEstado: number;
    iddgEstadoDetPlanilla: number;
    dtFechacreacion: string;
    vcUsuariocreacion: string;
    dtFechamodificacion: string;
    vcUsuariomodificacion: string;
}

export interface IDetallePlanillaPagoResultado {
    idDetallePlanillaPago: number;
    idPlanilla: number;
    idMoneda: number;
    dcMonto: string;
    idTipomediopago: number;
    idBanco: number;
    idCuentaBanco: number;
    vcNumerooperacion: number;
    vcCodigoidentificador: string;
    iddgEstado: number;
    iddgEstadoDetPlanilla: number;
    iddgEstadoDeposito: number;
    dtFechacreacion: string;
    dtFechaoperacion : string; //Agregado 17/07/2018
    vcUsuariocreacion: string;
    dtFechamodificacion: string;
    vcUsuariomodificacion: string;
}

export interface IDatosConsultaPlanilla {
    IdProducto: number;
    FechaDesde: string;
    FechaHasta: string;
    Usuario : string;
}
