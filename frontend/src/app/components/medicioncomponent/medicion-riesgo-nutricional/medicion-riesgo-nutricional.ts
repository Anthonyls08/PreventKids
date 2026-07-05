import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Medicionservice } from '../../../services/medicionservice';
import { Medicion } from '../../../models/Medicion';

@Component({
  selector: 'app-medicion-riesgo-nutricional',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './medicion-riesgo-nutricional.html',
  styleUrl: './medicion-riesgo-nutricional.css',
})
export class MedicionRiesgoNutricional implements OnInit {
  // Nivel de riesgo a filtrar; vacio = ambos (Bajo peso y Obesidad)
  clasificaciones: string[] = ['Bajo peso', 'Obesidad'];
  clasificacion = '';

  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  constructor(private mS: Medicionservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.consultar();
  }

  consultar(): void {
    // QUERY DE DECISIÓN: mediciones con riesgo nutricional (bajo peso / obesidad)
    this.mS.decidirRiesgoNutricional(this.clasificacion).subscribe((data) => {
      const lista: Medicion[] = data ?? [];
      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Agrupamos por clasificacion del IMC
        const conteo = new Map<string, number>();
        lista.forEach((m) => {
          conteo.set(m.clasificacionimc, (conteo.get(m.clasificacionimc) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: 'Mediciones con riesgo nutricional',
            backgroundColor: ['#ffa726', '#d72b04f5', '#42a5f5', '#26a69a'],
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
