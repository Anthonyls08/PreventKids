import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { District } from '../models/district';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Districtservice {
  private url = `${base_url}/distritos`;

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<District[]>(this.url);
  }

  insert(d: District){
    return this.http.post(`${this.url}/web`, d);
  }
  
  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<District>(`${this.url}/${id}`)
  }

  update(d: District) {
    return this.http.put(`${this.url}/update/${d.idDistrict}`, d, { responseType: 'text' });
  }
} 
