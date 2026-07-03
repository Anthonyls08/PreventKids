import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';

@Component({
  selector: 'app-district-zonas-riesgo',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './district-zonas-riesgo.html',
  styleUrl: './district-zonas-riesgo.css',
})
export class DistrictZonasRiesgo implements OnInit {
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private dS: Districtservice) {}

  ngOnInit(): void {
    // QUERY DE DECISIÓN: distritos en zonas de riesgo (Rural / Periurbana)
    this.dS.decidirZonasRiesgo().subscribe((data) => {
      const lista: District[] = data ?? [];
      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Agrupamos la lista devuelta por zona y contamos cuantos distritos hay
        const conteo = new Map<string, number>();
        lista.forEach((d) => {
          conteo.set(d.zone, (conteo.get(d.zone) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: 'Distritos en zona de riesgo',
            backgroundColor: [
              '#d72b04f5',
              '#f4a303e0',
              'rgb(194, 41, 31)',
              'rgba(230, 77, 77, 0.5)',
              'rgb(148, 14, 4)',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
