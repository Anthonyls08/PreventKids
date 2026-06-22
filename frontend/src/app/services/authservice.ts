import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/User';

const base_url = environment.base;
const TOKEN_KEY = 'preventkids_token';

interface LoginResponse {
  jwttoken: string;
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Estado reactivo de la sesion
  readonly logueado = signal<boolean>(this.tieneToken());

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${base_url}/login`, { username: email, password })
      .pipe(
        tap((res) => {
          this.guardarToken(res.jwttoken);
          this.logueado.set(true);
        })
      );
  }

  register(u: User) {
    return this.http.post(`${base_url}/users/web`, u);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.logueado.set(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.tieneToken();
  }

  private guardarToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  private tieneToken(): boolean {
    return !!this.getToken();
  }
}
