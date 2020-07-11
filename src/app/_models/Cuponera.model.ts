import {
    ITransaciones,
    IParametersRecibo,
} from 'app/_interfaces/ICuponera.interface';

export class Transaciones implements ITransaciones {
    idTransacion = 0;
    descripcion = '';
}
export class ParametersRecibo implements IParametersRecibo {
    idTransacion = 0;
    Key = '';
    Monto = 0;
    MontoInicial = 0;
    NroCuponera = 0;
    NroCupones = 0;
    NroMovimiento = 0;
    NroRecibo = '';
    UserCode = 0;
} 