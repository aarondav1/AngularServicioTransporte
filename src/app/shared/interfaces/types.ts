import { BusConRutasInterface } from "src/app/modules/buses/interfaces/BusConRutas-interface";
import { ConductorConBusInterface } from "src/app/modules/conductores/interfaces/ConductorConBus-interface";
import { ParadaInterface } from "src/app/modules/paradas/interfaces/parada-interface";
import { RutaConParadasInterface } from "src/app/modules/rutas/interfaces/ruta-con-paradas-interface";

export type DataInterface = ConductorConBusInterface | BusConRutasInterface 
                            | RutaConParadasInterface | ParadaInterface;
