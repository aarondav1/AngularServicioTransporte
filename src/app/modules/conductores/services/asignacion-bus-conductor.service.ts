import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsignacionBusConductorCreacionInterface } from '../interfaces/asignacion-bus-conductor-creacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionBusConductorService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/AsignacionBusConductor';


  PostAsignacionBusConductor(asignacionBusConductorCreacion: AsignacionBusConductorCreacionInterface) {
    return this.http.post(this.apiurl, asignacionBusConductorCreacion, { responseType: 'text' });
  }

  EliminarAsignacionBusConductor(idConductor: number){
    return this.http.delete(this.apiurl + '/EliminarPorIdConductor/' + idConductor, { responseType: 'text' });
  }

}
