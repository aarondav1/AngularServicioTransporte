import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RutaConParadasInterface } from '../../rutas/interfaces/ruta-con-paradas-interface';
import { ParadaInterface } from '../interfaces/parada-interface';
import { PostParadaInterface } from '../interfaces/PostParada-interface';

@Injectable({
  providedIn: 'root'
})
export class ParadaService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/parada';

  ListarParadas(): Observable<ParadaInterface[]>{
    return this.http.get<ParadaInterface[]>(this.apiurl);
  }

  GetParada(id: number): Observable<ParadaInterface> {
    return this.http.get<ParadaInterface>(this.apiurl + '/' + id);
  }

  PostParada(paradata: PostParadaInterface) {
    return this.http.post(this.apiurl, paradata, { responseType: 'text' });
  }

  ActualizarParada(id: number, paradata: PostParadaInterface) {
    return this.http.put(this.apiurl + '/' + id, paradata, { responseType: 'text' });
  }  

  EliminarParada(id: number){
    return this.http.delete(this.apiurl + '/' + id, { responseType: 'text' });
  }
}
