import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipoContenido } from '../models/TipoContenido';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Tipocontenidoservice {

  private url = `${base_url}/tipos-contenido`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoContenido[]>(this.url);
  }

  insert(t: TipoContenido) {
    return this.http.post(`${this.url}/insertar`, t);
  }

  listId(id: number) {
    return this.http.get<TipoContenido>(`${this.url}/${id}`);
  }

  update(id: number, t: TipoContenido) {
    return this.http.put(`${this.url}/${id}`, t, {
      responseType: 'text',
    });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }

  listId(id: number) {
    return this.http.get<TipoContenido>(`${this.url}/${id}`);
  }

  update(t: TipoContenido) {
    return this.http.put(`${this.url}/${t.idTipocontenido}`, t, { responseType: 'text' });
  }
}