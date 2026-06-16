import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Alimento } from '../models/Alimento';

// API publica Open Food Facts (sin API key, con CORS habilitado)
const OFF_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

interface OffNutriments {
  ['energy-kcal_100g']?: number;
  sugars_100g?: number;
  fat_100g?: number;
  proteins_100g?: number;
}

interface OffProduct {
  product_name?: string;
  brands?: string;
  nutriments?: OffNutriments;
  image_small_url?: string;
  nutriscore_grade?: string;
}

interface OffResponse {
  products: OffProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class Nutricionservice {
  private http = inject(HttpClient);

  buscar(termino: string): Observable<Alimento[]> {
    const params = new URLSearchParams({
      search_terms: termino,
      search_simple: '1',
      action: 'process',
      json: '1',
      page_size: '12',
      fields: 'product_name,brands,nutriments,image_small_url,nutriscore_grade',
    });

    return this.http.get<OffResponse>(`${OFF_URL}?${params.toString()}`).pipe(
      map((res) => this.mapear(res)),
      catchError(() => of([]))
    );
  }

  private mapear(res: OffResponse): Alimento[] {
    return (res.products ?? [])
      .filter((p) => p.product_name && p.product_name.trim().length > 0)
      .map((p) => {
        const n = p.nutriments ?? {};
        return {
          nombre: p.product_name!.trim(),
          marca: (p.brands ?? '').split(',')[0]?.trim() || 'Sin marca',
          calorias: Math.round(n['energy-kcal_100g'] ?? 0),
          azucar: Math.round((n.sugars_100g ?? 0) * 10) / 10,
          grasa: Math.round((n.fat_100g ?? 0) * 10) / 10,
          proteina: Math.round((n.proteins_100g ?? 0) * 10) / 10,
          imagen: p.image_small_url,
          nutriscore: (p.nutriscore_grade ?? '?').toLowerCase(),
        } as Alimento;
      })
      .slice(0, 12);
  }
}
