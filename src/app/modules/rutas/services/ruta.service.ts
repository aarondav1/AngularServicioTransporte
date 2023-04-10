import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostRutaInterface } from '../interfaces/PostRuta-interface';
import { RutaConParadasInterface } from '../interfaces/ruta-con-paradas-interface';
import { RutaInterface } from '../interfaces/ruta-interface';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private http: HttpClient) { }
  apiurl = environment.apiUrl + '/ruta';

  ListarRutas(): Observable<RutaConParadasInterface[]>{
    return this.http.get<RutaConParadasInterface[]>(this.apiurl + '/ObtenerRutasConParadas');
  }

  GetRuta(id: number): Observable<RutaConParadasInterface> {
    return this.http.get<RutaConParadasInterface>(this.apiurl + '/ObtenerRutaConParadas/' + id);
  }

  GetRutaConParadasAsociadas(id: number): Observable<RutaConParadasInterface> {
    // return this.http.get<RutaConParadasInterface>(this.apiurl + 
    //   '/ObtenerRutaConParadasAsociadas/' + id);
    return this.http.get<RutaConParadasInterface>(this.apiurl + '/ObtenerRutaConParadas/' + id);
  }

  GetRutaConParadasNoAsociadas(id: number): Observable<RutaConParadasInterface>{
    return this.http.get<RutaConParadasInterface>(this.apiurl + 
      '/ObtenerRutaConParadasNoAsociadas/' + id);
  }

  PostRuta(rutadata: PostRutaInterface) {
    return this.http.post(this.apiurl, rutadata, { responseType: 'text' });
  }

  ActualizarRuta(id: number, rutadata: PostRutaInterface) {
    return this.http.put(this.apiurl + '/' + id, rutadata, { responseType: 'text' });
  }  

  EliminarRuta(id: number){
    return this.http.delete(this.apiurl + '/' + id, { responseType: 'text' });
  }
}
