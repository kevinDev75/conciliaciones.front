export interface IPerfilResultado {
    IdPerfil: number;
    TipoPerfil: string;
    VcNombrePerfil: string;
    VcDescripcion: string;
    Estado: string;
    DtFechacreacion: string;
    VcUsuariocreacion: string;
    DtFechamodificacion: string;
    VcUsuariomodificacion: string;
    // Titulo : string;
}

export interface IDatosConsultarPerfil {
    NombrePerfil: string;
    IdTipoPerfil: number;
}

export interface IRecursosPerfilResultado {
    IdRecurso: number;
    Flag: string;
    Modulo: string;
    Opcion: string;
    Descripcion: string;
    Selected: boolean;
}

export interface IRecursoProceso {
    IdRecursos: string;
    IdTipoPerfil: number;
    VcNombrePerfil: string;
    VcDescripcion: string;
    IdPerfil: number;
    VcUsuariocreacion: string;
    VcUsuario: string;
}
