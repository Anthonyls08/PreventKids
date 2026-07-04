import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Hijo } from '../models/Hijo';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Hijoservice {
  private url = `${base_url}/hijos`;

  constructor(private http: HttpClient) {}

  // Todos los hijos (doctor y admin)
  list() {
    return this.http.get<Hijo[]>(`${this.url}/listar`);
  }

  // Solo los hijos del padre autenticado
  misHijos() {
    return this.http.get<Hijo[]>(`${this.url}/mis-hijos`);
  }

  insert(h: Hijo) {
    return this.http.post(`${this.url}/registrar`, h);
  }

  listId(id: number) {
    return this.http.get<Hijo>(`${this.url}/${id}`);
  }

  update(h: Hijo) {
    return this.http.put(`${this.url}/actualizar`, h, { responseType: 'text' });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
