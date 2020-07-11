import { IProducto } from "../_interfaces/producto.interface";

export class Producto implements IProducto {
    idProducto : number;
    descProducto: string;
}