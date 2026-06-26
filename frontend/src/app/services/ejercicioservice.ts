import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Ejercicio } from '../models/Ejercicio';

// API publica wger (sin API key, CORS habilitado)
const WGER_URL = 'https://wger.de/api/v2/exerciseinfo/?format=json&limit=60';
const LANG_ES = 4; // id de idioma espanol en wger

// Niveles de dificultad disponibles para el filtro del front.
export const DIFICULTADES = ['Principiante', 'Intermedio', 'Avanzado'];

interface WgerTranslation {
  name: string;
  description: string;
  language: number;
}
interface WgerCategory {
  name: string;
}
interface WgerImage {
  image: string;
}
interface WgerResult {
  translations: WgerTranslation[];
  category: WgerCategory;
  images: WgerImage[];
}
interface WgerResponse {
  results: WgerResult[];
}

@Injectable({
  providedIn: 'root',
})
export class Ejercicioservice {
  private http = inject(HttpClient);

  list(): Observable<Ejercicio[]> {
    return this.http.get<WgerResponse>(WGER_URL).pipe(
      map((res) => this.mapear(res)),
      map((lista) => (lista.length > 0 ? lista : this.fallback)),
      catchError(() => of(this.fallback))
    );
  }

  private mapear(res: WgerResponse): Ejercicio[] {
    return (res.results ?? [])
      .map((r) => {
        const t = r.translations?.find(
          (x) => x.language === LANG_ES && x.name && x.name.trim().length > 0
        );
        if (!t) {
          return null;
        }
        return {
          nombre: t.name,
          descripcion:
            this.limpiarHtml(t.description).slice(0, 180) ||
            'Ejercicio recomendado para mantenerte activo.',
          categoria: r.category?.name ?? 'General',
          dificultad: this.calcularDificultad(t.name),
          imagen: r.images?.[0]?.image,
        } as Ejercicio;
      })
      .filter((e): e is Ejercicio => e !== null)
      .slice(0, 24);
  }

  // La API de wger no expone un nivel de dificultad, así que se deriva de forma
  // determinista a partir del nombre para poder filtrar de manera estable.
  private calcularDificultad(nombre: string): string {
    const suma = [...nombre].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return DIFICULTADES[suma % DIFICULTADES.length];
  }

  private limpiarHtml(html: string): string {
    if (!html) {
      return '';
    }
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Respaldo local por si la API no responde
  private readonly fallback: Ejercicio[] = [
    {
      nombre: 'Saltar la cuerda',
      descripcion:
        'Ejercicio cardiovascular ideal para ninos. Mejora la coordinacion y quema calorias rapidamente.',
      categoria: 'Cardio',
      dificultad: 'Principiante',
    },
    {
      nombre: 'Sentadillas',
      descripcion:
        'Fortalece piernas y gluteos. Mantén la espalda recta y baja como si te sentaras en una silla.',
      categoria: 'Piernas',
      dificultad: 'Intermedio',
    },
    {
      nombre: 'Correr en el parque',
      descripcion:
        'Trotar 20 a 30 minutos al aire libre mejora la salud cardiovascular y el estado de animo.',
      categoria: 'Cardio',
      dificultad: 'Principiante',
    },
    {
      nombre: 'Bailar',
      descripcion:
        'Una rutina de baile divertida mantiene activos a los ninos mientras se divierten en familia.',
      categoria: 'Cardio',
      dificultad: 'Principiante',
    },
    {
      nombre: 'Plancha abdominal',
      descripcion:
        'Fortalece el core. Manten el cuerpo recto apoyado en antebrazos y puntas de los pies.',
      categoria: 'Abdomen',
      dificultad: 'Avanzado',
    },
    {
      nombre: 'Jumping jacks',
      descripcion:
        'Salta abriendo y cerrando brazos y piernas. Excelente para calentar y activar todo el cuerpo.',
      categoria: 'Cardio',
      dificultad: 'Intermedio',
    },
  ];
}
