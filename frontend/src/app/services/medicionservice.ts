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
}
