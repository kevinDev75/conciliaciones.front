export interface ICargarlote {
    IdBanco: number,
    IdProducto: number,
    IdProceso: string,
    UserCode: string,
    Data: string,
    FechaInicial: string,
    FechaFinal: string,
    CodProforma: string
}
export interface IBuscarPlanilla {
    IdBanco: number,
    IdProducto: number,
    FechaInicial: string,
    FechaFinal: string,
    CodigoUsuario: number
}
export interface IListaConciliado {
    IdProceso: string,
    IdBanco: string,
    TipoOperacion: string,
    IdProducto: string,
    NumeroRecibo: string,
    Importe: string,
    IdMoneda: string,
    MontoFormaPago: string,
    IdTipoPago: string,
    IdCuentaBanco: string,
    NumeroOperacion: string,
    FechaOperacion: string,
    Referencia: string,
    FlagExtorno: number,
    UserCode: string
}
