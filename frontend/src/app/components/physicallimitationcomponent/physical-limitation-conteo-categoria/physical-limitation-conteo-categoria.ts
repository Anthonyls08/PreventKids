import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';

@Component({
  selector: 'app-physical-limitation-conteo-categoria',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './physical-limitation-conteo-categoria.html',
  styleUrl: './physical-limitation-conteo-categoria.css',
})
export class PhysicalLimitationConteoCategoria implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  hasData = false;
  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'pie';

  constructor(private phS: PhysicalLimitationService) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.phS.getConteoPorCategoria().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.chartLabels = data.map((item) => item.categoria);
        this.chartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de limitaciones',
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
