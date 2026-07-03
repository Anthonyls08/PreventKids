import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Alimento } from '../../models/Alimento';
import { Nutricionservice } from '../../services/nutricionservice';

@Component({
  selector: 'app-dietacomponent',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './dietacomponent.html',
  styleUrl: './dietacomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dietacomponent {
  private nS = inject(Nutricionservice);

  termino = signal<string>('');
  resultados = signal<Alimento[]>([]);
  miDia = signal<Alimento[]>([]);
  cargando = signal<boolean>(false);
  buscado = signal<boolean>(false);

  // Total de calorias del dia (suma de lo agregado)
  totalCalorias = computed(() =>
    this.miDia().reduce((acc, a) => acc + a.calorias, 0)
  );
  totalAzucar = computed(
    () => Math.round(this.miDia().reduce((acc, a) => acc + a.azucar, 0) * 10) / 10
  );

  buscar() {
    const q = this.termino().trim();
    if (q.length === 0) {
      return;
    }
    this.cargando.set(true);
    this.buscado.set(true);
    this.nS.buscar(q).subscribe({
      next: (data) => {
        this.resultados.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.resultados.set([]);
        this.cargando.set(false);
      },
    });
  }

  agregar(a: Alimento) {
    this.miDia.update((lista) => [...lista, a]);
  }

  quitar(i: number) {
    this.miDia.update((lista) => lista.filter((_, idx) => idx !== i));
  }

  colorNutriscore(grado: string): string {
    const mapa: Record<string, string> = {
      a: '#2e7d32',
      b: '#7cb342',
      c: '#fdd835',
      d: '#fb8c00',
      e: '#e53935',
    };
    return mapa[grado] ?? '#9e9e9e';
  }

  // Semaforo nutricional por 100 g (umbrales del etiquetado frontal UK)
  colorAzucar(gramos: number): string {
    if (gramos <= 5) return '#2e7d32';
    if (gramos <= 22.5) return '#f9a825';
    return '#e53935';
  }

  colorGrasa(gramos: number): string {
    if (gramos <= 3) return '#2e7d32';
    if (gramos <= 17.5) return '#f9a825';
    return '#e53935';
  }

  // Ancho de la barra (0-100) relativo a un valor de referencia
  barra(valor: number, referencia: number): number {
    return Math.min(Math.round((valor / referencia) * 100), 100);
  }
}
