import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = 'http://localhost:5000/api'; 
  private traficoUrl = '/trafico';

  constructor(private http:HttpClient) {
  }

  getTrafico(pagina: number, radiobase: string, region: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.traficoUrl + '/' + pagina + '/' + radiobase + '/' + region)
  }
}
