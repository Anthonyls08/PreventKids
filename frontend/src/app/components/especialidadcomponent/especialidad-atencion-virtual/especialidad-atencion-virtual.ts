import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Specialtyservice } from '../../../services/specialtyservice';
import { Specialty } from '../../../models/Specialty';

@Component({
  selector: 'app-especialidad-atencion-virtual',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './especialidad-atencion-virtual.html',
  styleUrl: './especialidad-atencion-virtual.css',
})
export class EspecialidadAtencionVirtual {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  // El select trabaja con texto; se convierte a boolean al consultar
  virtual = 'true';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private sS: Specialtyservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // QUERY (filtro): especialidades con o sin atencion virtual
    this.sS.buscarPorAtencionVirtual(this.virtual === 'true').subscribe((data) => {
      const lista: Specialty[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de las especialidades por area
        const conteo = new Map<string, number>();
        lista.forEach((s) => {
          const key = s.area || 'Sin área';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        const modalidad = this.virtual === 'true' ? 'con atención virtual' : 'solo presenciales';
        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Especialidades ${modalidad} por área`,
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
