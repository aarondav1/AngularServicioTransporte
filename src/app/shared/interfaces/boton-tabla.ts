import { DataInterface } from "./types";

export interface BotonTabla {
    nombre: string;
    accion: string;
    color: string;
    visible: (element?: DataInterface) => boolean;
  }