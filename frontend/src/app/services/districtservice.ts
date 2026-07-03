import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { District } from '../models/district';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Districtservice {
  private url = `${base_url}/distritos`;

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<District[]>(this.url);
  }

  insert(d: District){
    return this.http.post(`${this.url}/web`, d);
  }
  
  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<District>(`${this.url}/${id}`)
  }

  update(d: District) {
    return this.http.put(`${this.url}/update/${d.idDistrict}`, d, { responseType: 'text' });
  }

  // QUERY (decision): distritos en zonas de riesgo (Rural / Periurbana)
  decidirZonasRiesgo() {
    return this.http.get<District[]>(`${this.url}/decidir-zonas-riesgo`);
  }

  // QUERY (decision): distritos prioritarios segun umbral de ubigeo
  decidirPrioridadUbigeo(ubigeo: number) {
    return this.http.get<District[]>(`${this.url}/decidir-prioridad-ubigeo`, {
      params: { ubigeo },
    });
  }

  // QUERY (filtro): distritos por departamento
  filtrarPorDepartamento(departamento: string) {
    return this.http.get<District[]>(`${this.url}/filtrar-por-departamento`, {
      params: { departamento },
    });
  }
}
