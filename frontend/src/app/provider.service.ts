import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = 'https://telexam.herokuapp.com/api';
  private traficoUrl = '/trafico';
  private usuarioUrl = '/usuario';
  private habilidadUrl = '/habilidad';

  constructor(private http:HttpClient) {
  }

  getTrafico(pagina: number, radiobase: string, region: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.traficoUrl + '/' + pagina + '/' + radiobase + '/' + region)
  }

  getUsuarios(pagina: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.usuarioUrl + '/' + pagina)
  }

  createUsuarios(usuario: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.usuarioUrl , usuario)
  }

  getHabilidades(): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.habilidadUrl)
  }

  createHabilidad(habilidad: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.habilidadUrl, habilidad)
  }

}
