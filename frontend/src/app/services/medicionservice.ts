import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../models/Medicion';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Medicionservice {
  private url = `${base_url}/api/medicion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Medicion[]>(this.url);
  }

  insert(m: Medicion) {
    return this.http.post(`${this.url}/ingresar`, m);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Medicion>(`${this.url}/${id}`);
  }

  update(id: number, m: Medicion) {
    return this.http.put(`${this.url}/actualizar/${id}`, m, {
      responseType: 'text',
    });
  }

  // QUERY (decision): mediciones con atencion prioritaria segun IMC (sobrepeso)
  decidirPrioridadImc(imc: number) {
    return this.http.get<Medicion[]>(`${this.url}/decidir-prioridad-imc`, {
      params: { imc },
    });
  }

  // QUERY (decision): mediciones con signos vitales fuera de rango
  decidirSignosVitales(presion: number, temperatura: number) {
    return this.http.get<Medicion[]>(`${this.url}/decidir-signos-vitales`, {
      params: { presion, temperatura },
    });
  }

  // QUERY (decision): mediciones con riesgo nutricional (bajo peso / obesidad).
  // clasificacion vacia = ambos niveles de riesgo.
  decidirRiesgoNutricional(clasificacion: string = '') {
    return this.http.get<Medicion[]>(`${this.url}/decidir-riesgo-nutricional`, {
      params: { clasificacion },
    });
  }

  // QUERY (filtro): mediciones de un hijo especifico
  filtrarPorHijo(idHijo: number) {
    return this.http.get<Medicion[]>(`${this.url}/filtrar-por-hijo/${idHijo}`);
  }
}
