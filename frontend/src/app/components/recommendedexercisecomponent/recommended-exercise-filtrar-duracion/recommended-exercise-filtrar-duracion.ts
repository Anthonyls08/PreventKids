import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Recommendedexerciseservice } from '../../../services/recommendedexerciseservice';
import { RecommendedExercise } from '../../../models/RecommendedExercise';

@Component({
  selector: 'app-recommended-exercise-filtrar-duracion',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './recommended-exercise-filtrar-duracion.html',
  styleUrl: './recommended-exercise-filtrar-duracion.css',
})
export class RecommendedExerciseFiltrarDuracion {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  duracionMinima = 10;

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private reS: Recommendedexerciseservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || this.duracionMinima <= 0) {
      return;
    }

    // QUERY (decision): ejercicios con duracion >= al minimo indicado
    this.reS.decidirPorDuracion(this.duracionMinima).subscribe((data) => {
      const lista: RecommendedExercise[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de los resultados por dificultad
        const conteo = new Map<string, number>();
        lista.forEach((e) => {
          const key = e.difficultRecommendedExercise || 'Sin dificultad';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Ejercicios de ${this.duracionMinima}+ min por dificultad`,
            backgroundColor: [
              '#2e7d32',
              '#00897b',
              '#66bb6a',
              '#26a69a',
              '#1b5e20',
            ],
          },
        ];
      } else {
        this.hasData = false;
        this.total = 0;
      }
      this.cdr.markForCheck();
    });
  }
}
