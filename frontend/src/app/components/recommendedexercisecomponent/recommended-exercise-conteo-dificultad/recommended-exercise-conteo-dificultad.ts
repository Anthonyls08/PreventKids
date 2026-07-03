import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Recommendedexerciseservice } from '../../../services/recommendedexerciseservice';

@Component({
  selector: 'app-recommended-exercise-conteo-dificultad',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './recommended-exercise-conteo-dificultad.html',
  styleUrl: './recommended-exercise-conteo-dificultad.css',
})
export class RecommendedExerciseConteoDificultad implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private reS: Recommendedexerciseservice) {}

  ngOnInit(): void {
    // Evitamos llamar al backend durante el prerender SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.reS.getConteoPorDificultad().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.dificultad);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de ejercicios',
            backgroundColor: [
              '#2e7d32',
              '#00897b',
              '#66bb6a',
              '#26a69a',
              '#1b5e20',
              '#80cbc4',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
      this.cdr.markForCheck();
    });
  }
}
