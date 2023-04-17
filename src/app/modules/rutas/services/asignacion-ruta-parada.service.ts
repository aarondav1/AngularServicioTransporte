import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionResponse } from 'src/app/shared/interfaces/asignacion-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionRutaParadaService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/AsignacionRutaParada';
  
  AgregarAsignacionesRutaParada(rutaId: number, paradasIds: number[]): Observable<AsignacionResponse>{
    const url = `${this.apiurl}/AgregarAsignacionesRutaParada/${rutaId}?Ids_Paradas=${paradasIds.join(',')}`;
    return this.http.post(url, {});
  }
 
  EliminarAsignacionesRutaParada(rutaId: number, paradasIds: number[]): Observable<string>{
    const url = `${this.apiurl}/EliminarAsignacionesRutaParada/${rutaId}?Ids_Paradas=${paradasIds.join(',')}`;
    return this.http.delete<string>(url, {responseType: 'text' as 'json'});
  }
}
