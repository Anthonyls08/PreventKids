import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Specialty } from '../models/Specialty';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Specialtyservice {

  private url = `${base_url}/specialties`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Specialty[]>(this.url);
  }

  insert(s: Specialty) {
    return this.http.post(`${this.url}/web`, s);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',

    });
  }

  listId(id: number) {
    return this.http.get<Specialty>(`${this.url}/${id}`);
  }

  update(s: Specialty) {
    return this.http.put(`${this.url}/actualiza`, s, { responseType: 'text' });
  }
}