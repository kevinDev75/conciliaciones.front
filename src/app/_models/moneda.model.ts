import {
  IMoneda

}    from 'app/_interfaces/moneda.interface';

export class Moneda implements IMoneda {
  IdMoneda: number = 0;
  DescripcionMoneda: string= "";
}
