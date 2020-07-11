import { IUser, IUsuarioPerfil } from '../_interfaces/user.interface';

export class User implements IUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class UsuarioPerfil implements IUsuarioPerfil {
    codigoUsuario: number;
    correoUsuario: string;
    nombre: string;
    apellidoPaterno: string;
}
