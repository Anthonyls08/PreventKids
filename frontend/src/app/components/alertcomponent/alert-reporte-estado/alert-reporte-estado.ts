import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Alertservice } from '../../../services/alertservice';

@Component({
  selector: 'app-alert-reporte-estado',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './alert-reporte-estado.html',
  styleUrl: './alert-reporte-estado.css',
})
export class AlertReporteEstado implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  hasData = false;
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'doughnut';

  constructor(private aS: Alertservice) {}

  ngOnInit(): void {
    // Evitamos llamar al backend durante el prerender SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.aS.getConteoPorEstado().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map((item) => item.estado);
        this.chartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de alertas',
            backgroundColor: [
              '#c62828', // Rojo (no leidas)
              '#2e7d32', // Verde (leidas)
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
