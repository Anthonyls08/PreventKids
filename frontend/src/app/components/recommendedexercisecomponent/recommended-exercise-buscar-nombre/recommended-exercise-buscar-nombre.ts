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
  selector: 'app-recommended-exercise-buscar-nombre',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './recommended-exercise-buscar-nombre.html',
  styleUrl: './recommended-exercise-buscar-nombre.css',
})
export class RecommendedExerciseBuscarNombre {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  nombre = '';

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
    if (!isPlatformBrowser(this.platformId) || !this.nombre.trim()) {
      return;
    }

    // QUERY (busqueda): ejercicios por nombre (LIKE)
    this.reS.buscarPorNombre(this.nombre.trim()).subscribe((data) => {
      const lista: RecommendedExercise[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Duracion de cada ejercicio encontrado
        this.chartLabels = lista.map((e) => e.nameRecommendedExercise);
        this.chartData = [
          {
            data: lista.map((e) => e.durationRecommendedExercise),
            label: `Duración (min) de ejercicios que contienen "${this.nombre.trim()}"`,
            backgroundColor: [
              '#1565c0',
              '#42a5f5',
              '#7e57c2',
              '#26a69a',
              '#ef5350',
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
