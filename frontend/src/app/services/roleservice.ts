import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Roleservice {
  private url = `${base_url}/roles`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Role[]>(`${this.url}`);
  }

  insert(r: Role) {
    return this.http.post(`${this.url}/web`, r);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  update(r: Role) {
    return this.http.put(`${this.url}/actualiza`, r, { responseType: 'text' });
  }
}
