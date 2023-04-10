import { BusInterface } from "../../buses/interfaces/bus-interface"

export interface ConductorConBusInterface{
    id: number,
    id_estado: number,
    nombres: string,
    apellidos: string,
    cedula: string,
    id_tipo_licencia: number
    busesDTO: BusInterface[];
}