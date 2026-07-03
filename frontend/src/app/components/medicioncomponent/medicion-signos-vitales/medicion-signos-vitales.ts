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
  selector: 'app-medicion-signos-vitales',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './medicion-signos-vitales.html',
  styleUrl: './medicion-signos-vitales.css',
})
export class MedicionSignosVitales {
  presion = 120;
  temperatura = 38;
  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private mS: Medicionservice) {}

  consultar(): void {
    if (this.presion <= 0 || this.temperatura <= 0) {
      return;
    }

    // QUERY DE DECISIÓN: mediciones con signos vitales fuera de rango
    this.mS.decidirSignosVitales(this.presion, this.temperatura).subscribe((data) => {
      const lista: Medicion[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Clasificamos cada medicion segun que signo vital esta fuera de rango
        let soloPresion = 0;
        let soloTemp = 0;
        let ambos = 0;
        lista.forEach((m) => {
          const presionAlta = m.presion >= this.presion;
          const tempAlta = m.temperatura >= this.temperatura;
          if (presionAlta && tempAlta) {
            ambos++;
          } else if (presionAlta) {
            soloPresion++;
          } else {
            soloTemp++;
          }
        });

        const labels: string[] = [];
        const valores: number[] = [];
        const colores: string[] = [];
        if (soloPresion > 0) {
          labels.push('Presión alta');
          valores.push(soloPresion);
          colores.push('#ef5350');
        }
        if (soloTemp > 0) {
          labels.push('Temperatura alta');
          valores.push(soloTemp);
          colores.push('#ffa726');
        }
        if (ambos > 0) {
          labels.push('Presión y temperatura');
          valores.push(ambos);
          colores.push('#8e24aa');
        }

        this.chartLabels = labels;
        this.chartData = [
          {
            data: valores,
            label: 'Mediciones con signos vitales alterados',
            backgroundColor: colores,
          },
        ];
      } else {
        this.hasData = false;
        this.total = 0;
      }
    });
  }
}
