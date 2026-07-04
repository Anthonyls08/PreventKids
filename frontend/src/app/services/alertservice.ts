import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../models/Alert';
import { AlertaPorEstadoDTO } from '../models/AlertaPorEstadoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Alertservice {
  private url = `${base_url}/alerta`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Alert[]>(`${this.url}/listar`);
  }

  insert(a: Alert) {
    return this.http.post(`${this.url}/ingresar`, a);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }

  listId(id: number) {
    return this.http.get<Alert>(`${this.url}/${id}`);
  }

  update(a: Alert) {
    return this.http.put(`${this.url}/actualizar`, a, {
      responseType: 'text',
    });
  }

  criticas(umbralRiesgo: number = 3) {
    return this.http.get<Alert[]>(`${this.url}/criticas`, {
      params: { umbralRiesgo },
    });
  }

  getConteoPorEstado() {
    return this.http.get<AlertaPorEstadoDTO[]>(`${this.url}/conteo-por-estado`);
  }
}