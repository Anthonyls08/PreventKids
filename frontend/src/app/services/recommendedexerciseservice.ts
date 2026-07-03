import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RecommendedExercise } from '../models/RecommendedExercise';
import { EjercicioPorDificultadDTO } from '../models/EjercicioPorDificultadDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Recommendedexerciseservice {
  private url = `${base_url}/EjercicioRecomendado`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RecommendedExercise[]>(this.url);
  }

  insert(e: RecommendedExercise) {
    return this.http.post(`${this.url}/registrarEjercicioRecomendado`, e);
  }

  listId(id: number) {
    return this.http.get<RecommendedExercise>(`${this.url}/${id}`);
  }

  update(e: RecommendedExercise) {
    return this.http.put(`${this.url}/actualizaEjercicioRecomendado`, e, {
      responseType: 'text',
    });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarPorNombre(nombre: string) {
    return this.http.get<RecommendedExercise[]>(`${this.url}/buscarPorNombre`, {
      params: { nombre },
    });
  }

  // GRAFICO: cantidad de ejercicios por dificultad
  getConteoPorDificultad() {
    return this.http.get<EjercicioPorDificultadDTO[]>(`${this.url}/conteo-por-dificultad`);
  }

  // QUERY (decision): ejercicios con duracion mayor o igual al minimo
  decidirPorDuracion(duracionMinima: number) {
    return this.http.get<RecommendedExercise[]>(`${this.url}/decidir-por-duracion`, {
      params: { duracionMinima },
    });
  }
}
