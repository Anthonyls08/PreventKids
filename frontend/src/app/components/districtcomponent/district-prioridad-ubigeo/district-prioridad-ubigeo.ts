import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';

@Component({
  selector: 'app-district-prioridad-ubigeo',
  imports: [BaseChartDirective, MatIconModule, FormsModule],
  templateUrl: './district-prioridad-ubigeo.html',
  styleUrl: './district-prioridad-ubigeo.css',
})
export class DistrictPrioridadUbigeo {
  ubigeo = 150000;
  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
  };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private dS: Districtservice) {}

  consultar(): void {
    if (!this.ubigeo || this.ubigeo <= 0) {
      return;
    }

    // QUERY DE DECISIÓN: distritos prioritarios con ubigeo <= umbral
    this.dS.decidirPrioridadUbigeo(this.ubigeo).subscribe((data) => {
      const lista: District[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Agrupamos por departamento para ver donde se concentra la prioridad
        const conteo = new Map<string, number>();
        lista.forEach((d) => {
          conteo.set(d.nameDepartment, (conteo.get(d.nameDepartment) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Distritos prioritarios (ubigeo <= ${this.ubigeo})`,
            backgroundColor: 'rgba(211, 47, 47, 0.7)',
            borderColor: 'rgb(148, 14, 4)',
            borderWidth: 1,
          },
        ];
      } else {
        this.hasData = false;
        this.total = 0;
      }
    });
  }
}
