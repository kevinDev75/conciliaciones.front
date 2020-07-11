import { IPerfilResultado, IDatosConsultarPerfil, IRecursosPerfilResultado, IRecursoProceso } from '../_interfaces/perfil.interface';

export class PerfilResultado implements IPerfilResultado {
    IdPerfil: number;
    TipoPerfil: string;
    VcNombrePerfil: string;
    VcDescripcion: string;
    DtFechacreacion: string;
    VcUsuariocreacion: string;
    DtFechamodificacion: string;
    VcUsuariomodificacion: string;
    Estado: string;
    Titulo: string;
}

export class DatosConsultarPerfil implements IDatosConsultarPerfil {
    NombrePerfil: string;
    IdTipoPerfil: number;
}

export class RecursosPerfilResultado implements IRecursosPerfilResultado {
    IdRecurso: number;
    Flag: string;
    Modulo: string;
    Opcion: string;
    Descripcion: string;
    Selected: boolean;

}

export class RecursoProceso implements IRecursoProceso {
    IdTipoPerfil: number;
    VcNombrePerfil: string;
    VcDescripcion: string;
    IdPerfil: number;
    IdRecursos: string;
    VcUsuariocreacion: string;
    VcUsuario: string;
}
