import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Medicionservice } from '../../../services/medicionservice';
import { Medicion } from '../../../models/Medicion';

@Component({
  selector: 'app-medicion-filtrar-usuario',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './medicion-filtrar-usuario.html',
  styleUrl: './medicion-filtrar-usuario.css',
})
export class MedicionFiltrarUsuario {
  idHijo = 1;
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

  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  constructor(private mS: Medicionservice, private cdr: ChangeDetectorRef) {}

  consultar(): void {
    if (!this.idHijo || this.idHijo <= 0) {
      return;
    }

    // QUERY DE FILTRO: mediciones de un hijo especifico
    this.mS.filtrarPorHijo(this.idHijo).subscribe((data) => {
      const lista: Medicion[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Agrupamos las mediciones del hijo por clasificacion del IMC
        const conteo = new Map<string, number>();
        lista.forEach((m) => {
          conteo.set(m.clasificacionimc, (conteo.get(m.clasificacionimc) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Mediciones del niño ${this.idHijo}`,
            backgroundColor: 'rgba(21, 101, 192, 0.7)',
            borderColor: '#0d47a1',
            borderWidth: 1,
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
