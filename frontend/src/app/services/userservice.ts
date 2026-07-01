import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private url = `${base_url}/users`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(this.url);
  }

  insert(u: User) {
    // El backend registra usuarios desde la web en POST /users/web
    return this.http.post(`${base_url}/users/web`, u);
  }

  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  update(u: User) {
    // El backend expone PUT /users/actualiza y lee el id desde el body.
    return this.http.put(`${this.url}/actualiza`, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
