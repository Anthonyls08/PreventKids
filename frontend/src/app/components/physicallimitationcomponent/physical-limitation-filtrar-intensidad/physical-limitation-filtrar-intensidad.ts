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
  selector: 'app-physical-limitation-filtrar-intensidad',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './physical-limitation-filtrar-intensidad.html',
  styleUrl: './physical-limitation-filtrar-intensidad.css',
})
export class PhysicalLimitationFiltrarIntensidad {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  // Opciones fijas del desplegable (no se escribe, se elige)
  intensidades: string[] = ['Baja', 'Media', 'Alta'];
  intensidad = this.intensidades[0];

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
    if (!isPlatformBrowser(this.platformId) || !this.intensidad) {
      return;
    }

    // QUERY (filtro): limitaciones por intensidad
    this.phS.filtrarPorIntensidad(this.intensidad).subscribe((data) => {
      const lista: PhysicalLimitation[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de los resultados por categoria
        const conteo = new Map<string, number>();
        lista.forEach((p) => {
          const key = p.categoryLimitation || 'Sin categoría';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Limitaciones de intensidad ${this.intensidad} por categoría`,
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
