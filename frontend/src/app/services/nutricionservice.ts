import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { Alimento } from '../models/Alimento';

// API publica Open Food Facts (sin API key, con CORS habilitado)
// pe.openfoodfacts.org devuelve solo productos vendidos en el Peru
// Nota: la API nueva search.openfoodfacts.org NO manda Access-Control-Allow-Origin,
// el navegador la bloquea; por eso se usa el endpoint clasico cgi/search.pl
const OFF_PE_URL = 'https://pe.openfoodfacts.org/cgi/search.pl';
const OFF_WORLD_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

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
  count?: number;
  products: OffProduct[];
}

// Resultado de una busqueda paginada
export interface ResultadoAlimentos {
  alimentos: Alimento[];
  total: number;
  fuente: 'peru' | 'mundo';
}

@Injectable({
  providedIn: 'root',
})
export class Nutricionservice {
  private http = inject(HttpClient);

  // Busca con paginacion. En la primera pagina intenta primero productos
  // vendidos en el Peru y si no hay cae al catalogo mundial; al cambiar de
  // pagina se pasa la fuente para seguir en el mismo catalogo.
  buscar(
    termino: string,
    pagina: number = 1,
    fuente?: 'peru' | 'mundo'
  ): Observable<ResultadoAlimentos> {
    if (fuente === 'mundo') {
      return this.buscarEn(OFF_WORLD_URL, termino, pagina, 'mundo');
    }
    if (fuente === 'peru') {
      return this.buscarEn(OFF_PE_URL, termino, pagina, 'peru');
    }
    return this.buscarEn(OFF_PE_URL, termino, pagina, 'peru').pipe(
      switchMap((r) =>
        r.total > 0 ? of(r) : this.buscarEn(OFF_WORLD_URL, termino, pagina, 'mundo')
      )
    );
  }

  private buscarEn(
    url: string,
    termino: string,
    pagina: number,
    fuente: 'peru' | 'mundo'
  ): Observable<ResultadoAlimentos> {
    const params = new URLSearchParams({
      search_terms: termino,
      search_simple: '1',
      action: 'process',
      json: '1',
      page: String(pagina),
      page_size: '12',
      fields: 'product_name,brands,nutriments,image_small_url,nutriscore_grade',
    });

    return this.http.get<OffResponse>(`${url}?${params.toString()}`).pipe(
      map((res) => ({
        alimentos: this.mapear(res),
        total: res.count ?? 0,
        fuente,
      })),
      catchError(() => of({ alimentos: [], total: 0, fuente }))
    );
  }

  private mapear(res: OffResponse): Alimento[] {
    return (res.products ?? [])
      .filter((p) => p.product_name && p.product_name.trim().length > 0)
      .map((p) => {
        const n = p.nutriments ?? {};
        const grado = (p.nutriscore_grade ?? '?').toLowerCase();
        return {
          nombre: p.product_name!.trim(),
          marca: this.primeraMarca(p.brands),
          calorias: Math.round(n['energy-kcal_100g'] ?? 0),
          azucar: Math.round((n.sugars_100g ?? 0) * 10) / 10,
          grasa: Math.round((n.fat_100g ?? 0) * 10) / 10,
          proteina: Math.round((n.proteins_100g ?? 0) * 10) / 10,
          imagen: p.image_small_url,
          nutriscore: grado.length === 1 ? grado : '?',
        } as Alimento;
      })
      .slice(0, 12);
  }

  // brands viene como texto separado por comas; se toma la primera
  private primeraMarca(brands?: string): string {
    const marca = (brands ?? '').split(',')[0]?.trim();
    if (!marca) return 'Sin marca';
    return marca.charAt(0).toUpperCase() + marca.slice(1);
  }
}
