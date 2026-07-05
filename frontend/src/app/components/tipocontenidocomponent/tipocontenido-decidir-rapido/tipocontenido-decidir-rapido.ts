import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';
import { TipoContenido } from '../../../models/TipoContenido';

@Component({
  selector: 'app-tipocontenido-decidir-rapido',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './tipocontenido-decidir-rapido.html',
  styleUrl: './tipocontenido-decidir-rapido.css',
})
export class TipocontenidoDecidirRapido implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  // Las categorias salen de los tipos ya registrados (la query compara el nombre exacto)
  categorias: string[] = [];
  categoria = '';
  minutos = 10;

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private tS: Tipocontenidoservice) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.tS.list().subscribe((data) => {
      this.categorias = Array.from(new Set((data ?? []).map((t) => t.nombre)));
      this.categoria = this.categorias[0] ?? '';
      this.cdr.markForCheck();
    });
  }

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || !this.categoria || this.minutos <= 0) {
      return;
    }

    // QUERY (decision): tipos de contenido rapidos (duracion maxima y categoria)
    this.tS.decidirContenidoRapido(this.minutos, this.categoria).subscribe((data) => {
      const lista: TipoContenido[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Duracion de cada tipo de contenido encontrado
        this.chartLabels = lista.map((t) => t.nombre);
        this.chartData = [
          {
            data: lista.map((t) => t.duracion),
            label: `Duración (min) de "${this.categoria}" con máximo ${this.minutos} min`,
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
