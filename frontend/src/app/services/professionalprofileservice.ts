import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProfessionalProfile } from '../models/ProfessionalProfile';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Professionalprofileservice {
  private url = `${base_url}/professionalprofiles`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ProfessionalProfile[]>(this.url);
  }
}
