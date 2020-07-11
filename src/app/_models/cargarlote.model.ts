import {
    ICargarlote, IBuscarPlanilla, IListaConciliado,
    // tslint:disable-next-line:import-spacing
} from 'app/_interfaces/cargarlote.interface';


export class Cargarlote implements ICargarlote {
    IdBanco: number;
    IdProducto: number;
    IdProceso: string;
    UserCode: string;
    Data: string;
    FechaInicial: string;
    FechaFinal: string;
    CodProforma: string;
}
export class BuscarPlanilla implements IBuscarPlanilla {
    IdBanco: number;
    IdProducto: number;
    FechaInicial: string;
    FechaFinal: string;
    CodigoUsuario: number;
}
export class ListaConciliado implements IListaConciliado {
    FlagExtorno: number;
    IdProceso: string;
    IdBanco: string;
    TipoOperacion: string;
    IdProducto: string;
    NumeroRecibo: string;
    Importe: string;
    IdMoneda: string;
    MontoFormaPago: string;
    IdTipoPago: string;
    IdCuentaBanco: string;
    NumeroOperacion: string;
    FechaOperacion: string;
    Referencia: string;
    UserCode: string;


}
