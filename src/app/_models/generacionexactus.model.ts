import { ITipoArchivo, IDatosConsultaArchivos } from "../_interfaces/generacionexactus.interface";

export class TipoArchivo implements ITipoArchivo {
    idtipoarchivo: string;
    desctipoarchivo: string;
}

export class DatosConsultaArchivos implements IDatosConsultaArchivos {
    IdTipoArchivo: number;
    FechaDesde: string;
    FechaHasta: string;
    Usuario : string;
}