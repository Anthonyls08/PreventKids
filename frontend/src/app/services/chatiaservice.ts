import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ChatIA } from '../models/ChatIA';
import { ChatRespuesta } from '../models/ChatRespuesta';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Chatiaservice {
  private url = `${base_url}/chatIA`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ChatIA[]>(`${this.url}/listar`);
  }

  insert(c: ChatIA) {
    return this.http.post(`${this.url}/ingresar`, c);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<ChatIA>(`${this.url}/${id}`);
  }

  update(c: ChatIA) {
    return this.http.put(`${this.url}/actualizar`, c, { responseType: 'text' });
  }

  // Asistente: cache de similitud primero, luego API de Gemini
  preguntar(pregunta: string) {
    return this.http.post<ChatRespuesta>(`${this.url}/preguntar`, { pregunta });
  }
}
