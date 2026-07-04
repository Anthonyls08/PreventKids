import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Medicionservice } from '../../../services/medicionservice';
import { Medicion } from '../../../models/Medicion';

@Component({
  selector: 'app-medicion-prioridad-imc',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './medicion-prioridad-imc.html',
  styleUrl: './medicion-prioridad-imc.css',
})
export class MedicionPrioridadImc {
  imc = 25;
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

  constructor(private mS: Medicionservice) {}

  consultar(): void {
    if (!this.imc || this.imc <= 0) {
      return;
    }

    // QUERY DE DECISIÓN: mediciones con atencion prioritaria (sobrepeso, IMC >= umbral)
    this.mS.decidirPrioridadImc(this.imc).subscribe((data) => {
      const lista: Medicion[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Agrupamos las mediciones prioritarias por hijo
        const conteo = new Map<string, number>();
        lista.forEach((m) => {
          const nombre = m.hijo
            ? `${m.hijo.nombre} ${m.hijo.apellido}`.trim() || `Niño ${m.hijo.idHijo}`
            : 'Sin niño';
          conteo.set(nombre, (conteo.get(nombre) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Mediciones prioritarias (IMC >= ${this.imc})`,
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
