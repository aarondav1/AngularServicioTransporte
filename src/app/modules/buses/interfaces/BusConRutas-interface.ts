import { RutaInterface } from "../../rutas/interfaces/ruta-interface";

export interface BusConRutasInterface {
    id: number,
    id_Estado: number,
    numero: number,
    placa: string,
    modelo: string,
    capacidad: number,
    anio: number,
    rutasDTO: RutaInterface[]
}
