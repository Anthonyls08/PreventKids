import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Alertservice } from '../../../services/alertservice';
import { Alert } from '../../../models/Alert';

@Component({
  selector: 'app-alert-filtrar-criticas',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './alert-filtrar-criticas.html',
  styleUrl: './alert-filtrar-criticas.css',
})
export class AlertFiltrarCriticas {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  umbralRiesgo = 3;

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private aS: Alertservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || this.umbralRiesgo < 1 || this.umbralRiesgo > 5) {
      return;
    }

    // QUERY (filtro): alertas no leidas cuyo tipo de alerta tiene nivel de riesgo >= al umbral
    this.aS.criticas(this.umbralRiesgo).subscribe((data) => {
      const lista: Alert[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de las alertas criticas por tipo de alerta
        const conteo = new Map<string, number>();
        lista.forEach((a) => {
          const key = a.tipoalert?.nombre || 'Sin tipo';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Alertas criticas (riesgo >= ${this.umbralRiesgo}) por tipo`,
            backgroundColor: [
              '#c62828',
              '#e64a19',
              '#f9a825',
              '#ad1457',
              '#6a1b9a',
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
