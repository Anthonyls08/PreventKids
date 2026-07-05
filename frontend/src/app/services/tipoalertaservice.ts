import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipoAlerta } from '../models/TipoAlerta';
import { AlertaPorNivelRiesgoDTO } from '../models/AlertaPorNivelRiesgoDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Tipoalertaservice {
  private url = `${base_url}/tipos-alerta`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoAlerta[]>(`${this.url}/listar`);
  }

  insert(t: TipoAlerta) {
    return this.http.post(`${this.url}/insertar`, t);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<TipoAlerta>(`${this.url}/${id}`);
  }

  update(t: TipoAlerta) {
    return this.http.put(`${this.url}/actualizar`, t, { responseType: 'text' });
  }

  buscar(nombre: string) {
    return this.http.get<TipoAlerta[]>(`${this.url}/buscar?nombre=${nombre}`);
  }

  getConteoPorNivelRiesgo() {
    return this.http.get<AlertaPorNivelRiesgoDTO[]>(`${this.url}/conteo-por-nivelriesgo`);
  }

  // QUERY (filtro): tipos de alerta por nivel de riesgo minimo y atencion profesional
  filtrarPorNivelRiesgo(nivelRiesgo: number, requiereAtencion: boolean) {
    return this.http.get<TipoAlerta[]>(`${this.url}/filtrar-por-nivelriesgo`, {
      params: { nivelRiesgo, requiereAtencion },
    });
  }
}
