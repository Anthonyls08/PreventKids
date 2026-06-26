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
}
