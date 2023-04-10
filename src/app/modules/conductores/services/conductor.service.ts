import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConductorInterface } from '../interfaces/conductor-interface';
import { ConductorConBusInterface } from '../interfaces/ConductorConBus-interface';
import { PostConductorInterface } from '../interfaces/PostConductor-interface';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/conductor';
  //'https://localhost:7020/api/conductor'

  // ListarConductores(): Observable<ConductorInterface[]>{
  //   return this.http.get<ConductorInterface[]>(this.apiurl);
  // }
  //CON BUSES
  ListarConductores(): Observable<ConductorConBusInterface[]>{
    return this.http.get<ConductorConBusInterface[]>(this.apiurl + '/ObtenerConductoresConBuses');
  }

  GetConductor(id: number): Observable<ConductorConBusInterface> {
    return this.http.get<ConductorConBusInterface>(this.apiurl + '/ObtenerConBuses/' + id);
  }

  PostConductor(conductordata: PostConductorInterface) {
    return this.http.post(this.apiurl, conductordata, { responseType: 'text' });
  }

  ActualizarConductor(id: number, conductordata: PostConductorInterface) {
    return this.http.put(this.apiurl + '/' + id, conductordata, { responseType: 'text' });
  }  

  EliminarConductor(id: number){
    return this.http.delete(this.apiurl + '/' + id, { responseType: 'text' });
  }

}