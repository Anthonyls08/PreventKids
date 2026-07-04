import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';
import { DEPARTAMENTOS } from '../../../data/ubigeo-lima-callao';

@Component({
  selector: 'app-district-filtrar-departamento',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './district-filtrar-departamento.html',
  styleUrl: './district-filtrar-departamento.css',
})
export class DistrictFiltrarDepartamento {
  // Opciones fijas del desplegable (no se escribe, se elige)
  departamentos: string[] = DEPARTAMENTOS.map((d) => d.nombre);
  departamento = this.departamentos[0] ?? '';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  constructor(private dS: Districtservice, private cdr: ChangeDetectorRef) {}

  consultar(): void {
    if (!this.departamento) {
      return;
    }

    // QUERY DE FILTRO: distritos por departamento
    this.dS.filtrarPorDepartamento(this.departamento).subscribe((data) => {
      const lista: District[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de los distritos del departamento por zona
        const conteo = new Map<string, number>();
        lista.forEach((d) => {
          conteo.set(d.zone, (conteo.get(d.zone) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Distritos de ${this.departamento} por zona`,
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
