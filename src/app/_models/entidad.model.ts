import {
  IBanco,
  ICuenta,
  ITipoPerfil
} from 'app/_interfaces/entidad.interface';

export class Banco implements IBanco {
  constructor(idbanco: number , descripcion : string ) 
    {
        this.idBanco = idbanco;
        this.descripcionBanco = descripcion;
    };
  idBanco = 0;
  descripcionBanco = '';
}

export class Cuenta implements ICuenta {
  IdCuenta = 0;
  NumeroCuenta = '';
}

export class TipoPerfil implements ITipoPerfil {
  idTipoPerfil = 0;
  vcDescripcion = '';
}
