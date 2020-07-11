export interface ITransaciones {
    idTransacion: number;
    descripcion: string;
}
export interface IParametersRecibo {
    idTransacion: number;
    NroRecibo: string;
    NroCuponera: number;
    NroMovimiento: number;
    Monto: number;
    MontoInicial: number;
    NroCupones: number;
    UserCode: number;
    Key: string;
}
