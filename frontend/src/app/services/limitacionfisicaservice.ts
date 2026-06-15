import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PhysicalLimitation } from '../models/physical-limitation'; // Asegúrate de crear este modelo

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PhysicalLimitationService {
  private url = `${base_url}/LimitacionFisica`; 

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PhysicalLimitation[]>(this.url);
  }

  insert(p: PhysicalLimitation) {
    return this.http.post(`${this.url}/web`, p);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

}