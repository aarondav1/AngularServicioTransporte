import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusConRutasInterface } from '../interfaces/BusConRutas-interface';
import { PostBusInterface } from '../interfaces/PostBus-interface';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/bus';

  ListarBuses(): Observable<BusConRutasInterface[]>{
    return this.http.get<BusConRutasInterface[]>(this.apiurl + '/ObtenerBusesConRutas');
  }

  GetBusConRutasAsociadas(id: number): Observable<BusConRutasInterface> {
    return this.http.get<BusConRutasInterface>(this.apiurl + '/ObtenerBusConRutas/' + id);
  }

  GetBusConRutasNoAsociadas(id: number): Observable<BusConRutasInterface> {
    return this.http.get<BusConRutasInterface>(this.apiurl + '/ObtenerBusConRutasNoAsociadas/' + id);
  }

  PostBus(busdata: PostBusInterface) {
    return this.http.post(this.apiurl, busdata, { responseType: 'text' });
  }

  ActualizarBus(id: number, busdata: PostBusInterface) {
    return this.http.put(this.apiurl + '/' + id, busdata, { responseType: 'text' });
  }  

  EliminarBus(id: number){
    return this.http.delete(this.apiurl + '/' + id, { responseType: 'text' });
  }

}
