import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionResponse } from 'src/app/shared/interfaces/asignacion-response';
import { environment } from 'src/environments/environment';
import { AsignacionBusRutaCreacionInterface } from '../interfaces/asignacion-bus-ruta-creacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionBusRutaService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/AsignacionRutaBus';


  PostAsignacionBusRuta(asignacionBusRutaCreacion: AsignacionBusRutaCreacionInterface) {
    return this.http.post(this.apiurl, asignacionBusRutaCreacion, { responseType: 'text' });
  }
  
  AgregarAsignacionesBusRuta(busId: number, rutasIds: number[]): Observable<AsignacionResponse>{
    const url = `${this.apiurl}/AgregarAsignacionesRutaBus/${busId}?Ids_Rutas=${rutasIds.join(',')}`;
    return this.http.post(url, {});
  }
 
  EliminarAsignacionesBusRuta(busId: number, rutasIds: number[]): Observable<string>{
    const url = `${this.apiurl}/EliminarAsignacionesRutaBus/${busId}?Ids_Rutas=${rutasIds.join(',')}`;
    return this.http.delete<string>(url, {responseType: 'text' as 'json'});
  }
  
    // EliminarAsignacionesBusRuta(body: AsignacionBusRutaEliminacion){
  //   const url = `${this.apiurl}/EliminarAsignacionesRutaBus?Id_Bus=${body.Id_Bus}&Ids_Rutas=${body.Ids_Rutas.join(',')}`;
  //   return this.http.delete(url, { responseType: 'text' });
  // }
//   EliminarAsignacionesBusRuta(busId: number, rutasIds: number[]): Observable<string>{
//     const url = `${this.apiurl}/EliminarAsignacionesRutaBus/${busId}`;
//     const params = new HttpParams().set('Ids_Rutas', rutasIds.map(String));
//     return this.http.delete<string>(url, { params, responseType: 'text' as 'json'});
// }
}
