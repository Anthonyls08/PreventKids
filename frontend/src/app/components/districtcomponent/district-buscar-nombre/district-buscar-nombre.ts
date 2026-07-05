import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';

@Component({
  selector: 'app-district-buscar-nombre',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './district-buscar-nombre.html',
  styleUrl: './district-buscar-nombre.css',
})
export class DistrictBuscarNombre {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  nombre = '';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private dS: Districtservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || !this.nombre.trim()) {
      return;
    }

    // QUERY (busqueda): distritos por nombre (LIKE)
    this.dS.buscarPorNombre(this.nombre.trim()).subscribe((data) => {
      const lista: District[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de los distritos encontrados por zona
        const conteo = new Map<string, number>();
        lista.forEach((d) => {
          const key = d.zone || 'Sin zona';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Distritos que contienen "${this.nombre.trim()}" por zona`,
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
