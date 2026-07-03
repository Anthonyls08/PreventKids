import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PhysicalLimitation } from '../models/physical-limitation'; // Asegúrate de crear este modelo
import { LimitacionPorCategoriaDTO } from '../models/LimitacionPorCategoriaDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PhysicalLimitationService {
  private url = `${base_url}/LimitacionFisica`; 

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PhysicalLimitation[]>(this.url);
  }

  insert(p: PhysicalLimitation) {
    return this.http.post(`${this.url}/web`, p);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<PhysicalLimitation>(`${this.url}/${id}`);
  }

  update(p: PhysicalLimitation) {
    return this.http.put(`${this.url}/actualiza`, p, { responseType: 'text' });
  }

  // GRAFICO: cantidad de limitaciones por categoria
  getConteoPorCategoria() {
    return this.http.get<LimitacionPorCategoriaDTO[]>(`${this.url}/conteo-por-categoria`);
  }

  // QUERY (filtro): limitaciones por intensidad
  filtrarPorIntensidad(intensidad: string) {
    return this.http.get<PhysicalLimitation[]>(`${this.url}/filtrar-por-intensidad`, {
      params: { intensidad },
    });
  }
}