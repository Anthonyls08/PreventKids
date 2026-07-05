import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';
import { PhysicalLimitation } from '../../../models/physical-limitation';

@Component({
  selector: 'app-physical-limitation-filtrar-categoria',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './physical-limitation-filtrar-categoria.html',
  styleUrl: './physical-limitation-filtrar-categoria.css',
})
export class PhysicalLimitationFiltrarCategoria {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  categoria = '';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private phS: PhysicalLimitationService) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || !this.categoria.trim()) {
      return;
    }

    // QUERY (filtro): limitaciones por categoria
    this.phS.filtrarPorCategoria(this.categoria.trim()).subscribe((data) => {
      const lista: PhysicalLimitation[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de los resultados por intensidad
        const conteo = new Map<string, number>();
        lista.forEach((p) => {
          const key = p.intensityLimitation || 'Sin intensidad';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Limitaciones de categoría ${this.categoria.trim()} por intensidad`,
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
