import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { Recomendacion } from '../models/Recomendacion';

// API publica de ejercicios wger (sin API key, con CORS habilitado)
const WGER_URL = 'https://wger.de/api/v2/exerciseinfo/?format=json&limit=80';
// Id de idioma espanol en wger
const LANG_ES = 4;

interface WgerTranslation {
  name: string;
  description: string;
  language: number;
}

interface WgerImage {
  image: string;
}

interface WgerResult {
  translations: WgerTranslation[];
  images: WgerImage[];
}

interface WgerResponse {
  results: WgerResult[];
}

@Injectable({
  providedIn: 'root',
})
export class Recommendationservice {
  private http = inject(HttpClient);

  getRecomendaciones(): Observable<Recomendacion[]> {
    return this.http.get<WgerResponse>(WGER_URL).pipe(
      map((res) => this.mapearWger(res)),
      map((lista) => (lista.length > 0 ? lista : this.fallback)),
      catchError(() => of(this.fallback))
    );
  }

  private mapearWger(res: WgerResponse): Recomendacion[] {
    return (res.results ?? [])
      .map((r) => {
        // Solo tomamos ejercicios que tengan traduccion al espanol.
        const t = r.translations?.find(
          (x) => x.language === LANG_ES && x.name && x.name.trim().length > 0
        );
        if (!t) {
          return null;
        }
        const descripcion = this.limpiarHtml(t.description).slice(0, 220);
        return {
          titulo: t.name,
          descripcion:
            descripcion || 'Ejercicio recomendado para mantenerte activo.',
          imagen: r.images?.[0]?.image,
          fuente: 'wger.de',
        } as Recomendacion;
      })
      .filter((r): r is Recomendacion => r !== null)
      .slice(0, 20);
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

  // Respaldo local: consejos de prevencion de obesidad infantil y actividad fisica
  private readonly fallback: Recomendacion[] = [
    {
      titulo: '60 minutos de movimiento al dia',
      descripcion:
        'Los ninos y adolescentes deben acumular al menos 60 minutos diarios de actividad fisica moderada a vigorosa, como correr, saltar o jugar.',
      fuente: 'OMS',
    },
    {
      titulo: 'Reduce las pantallas',
      descripcion:
        'Limita el tiempo frente a pantallas a un maximo de 2 horas al dia y reemplazalo por juego activo al aire libre.',
      fuente: 'PreventKids',
    },
    {
      titulo: 'Mas frutas y verduras',
      descripcion:
        'Incluye 5 porciones de frutas y verduras al dia. Sustituye snacks ultraprocesados por opciones naturales.',
      fuente: 'PreventKids',
    },
    {
      titulo: 'Hidratacion con agua',
      descripcion:
        'Cambia las bebidas azucaradas y gaseosas por agua. El exceso de azucar liquida es una causa frecuente de sobrepeso infantil.',
      fuente: 'PreventKids',
    },
    {
      titulo: 'Caminar en familia',
      descripcion:
        'Salir a caminar 30 minutos en familia mejora el habito de actividad fisica y fortalece los vinculos.',
      fuente: 'PreventKids',
    },
    {
      titulo: 'Sueno reparador',
      descripcion:
        'Dormir entre 9 y 11 horas ayuda a regular el apetito y previene el aumento de peso en la ninez.',
      fuente: 'OMS',
    },
  ];
}
