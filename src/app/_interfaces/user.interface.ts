export interface IUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IUsuarioPerfil {
    codigoUsuario: number;
    correoUsuario: string;
    nombre: string;
    apellidoPaterno: string;
}
