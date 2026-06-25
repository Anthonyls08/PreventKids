import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EducationalContent } from '../models/EducationalContent';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Educationalcontentservice {
  private url = `${base_url}/contenido-educativo`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<EducationalContent[]>(`${this.url}/listar`);
  }

  insert(e: EducationalContent) {
    return this.http.post(`${this.url}/registrar`, e);
  }

  listId(id: number) {
    return this.http.get<EducationalContent>(`${this.url}/${id}`);
  }

  update(e: EducationalContent) {
    return this.http.put(`${this.url}/actualizar`, e, { responseType: 'text' });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarPorTipo(tipo: string) {
    return this.http.get<EducationalContent[]>(`${this.url}/buscartipo`, {
      params: { tipo },
    });
  }
}
