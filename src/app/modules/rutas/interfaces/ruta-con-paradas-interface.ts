import { ParadaInterface } from "../../paradas/interfaces/parada-interface";

export interface RutaConParadasInterface {
    id: number,
    id_Estado: number,
    nombre: string,
    origen: string,
    destino: string,
    paradasDTO: ParadaInterface[]
}
