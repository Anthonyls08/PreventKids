import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VirtualConsultation } from '../models/VirtualConsultation';
import { ConsultaPorEstadoDTO } from '../models/ConsultaPorEstadoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Virtualconsultationservice {
  private url = `${base_url}/virtualconsultations`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<VirtualConsultation[]>(`${this.url}/listar`);
  }

  insert(v: VirtualConsultation) {
    return this.http.post(`${this.url}/web`, v);
  }

  listId(id: number) {
    return this.http.get<VirtualConsultation>(`${this.url}/${id}`);
  }

  update(v: VirtualConsultation) {
    return this.http.put(`${this.url}/actualiza`, v, { responseType: 'text' });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getConteoPorEstado() {
    return this.http.get<ConsultaPorEstadoDTO[]>(`${this.url}/conteo-por-estado`);
  }

  // QUERY (decision): consultas por estado y nombre del paciente
  decidirPrioridad(estado: string, nombrePaciente: string) {
    return this.http.get<VirtualConsultation[]>(`${this.url}/decidir-prioridad`, {
      params: { estado, nombrePaciente },
    });
  }
}
