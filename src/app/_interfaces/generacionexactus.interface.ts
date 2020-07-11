export interface ITipoArchivo {
    idtipoarchivo: string;
    desctipoarchivo: string;
}

export interface IDatosConsultaArchivos {
    IdTipoArchivo: number;
    FechaDesde: string;
    FechaHasta: string;
    Usuario : string;
}
