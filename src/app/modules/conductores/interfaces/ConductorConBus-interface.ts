import { BusInterface } from "../../buses/interfaces/bus-interface"

export interface ConductorConBusInterface{
    id: number,
    id_Estado: number,
    nombres: string,
    apellidos: string,
    cedula: string,
    id_Tipo_Licencia: number
    busesDTO: BusInterface[];
}