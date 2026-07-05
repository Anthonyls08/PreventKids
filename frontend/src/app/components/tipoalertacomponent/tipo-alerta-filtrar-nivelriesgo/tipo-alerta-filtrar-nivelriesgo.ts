import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Tipoalertaservice } from '../../../services/tipoalertaservice';
import { TipoAlerta } from '../../../models/TipoAlerta';

@Component({
  selector: 'app-tipo-alerta-filtrar-nivelriesgo',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './tipo-alerta-filtrar-nivelriesgo.html',
  styleUrl: './tipo-alerta-filtrar-nivelriesgo.css',
})
export class TipoAlertaFiltrarNivelriesgo {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  // Opciones fijas del desplegable (no se escribe, se elige)
  niveles: number[] = [1, 2, 3, 4, 5];
  nivelRiesgo = 1;
  // El select trabaja con texto; se convierte a boolean al consultar
  requiereAtencion = 'true';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private tS: Tipoalertaservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // QUERY (filtro): tipos de alerta por nivel de riesgo minimo y atencion profesional
    this.tS
      .filtrarPorNivelRiesgo(Number(this.nivelRiesgo), this.requiereAtencion === 'true')
      .subscribe((data) => {
        const lista: TipoAlerta[] = data ?? [];
        this.buscado = true;

        if (lista.length > 0) {
          this.hasData = true;
          this.total = lista.length;

          // Nivel de riesgo de cada tipo de alerta encontrado
          this.chartLabels = lista.map((t) => t.nombre);
          this.chartData = [
            {
              data: lista.map((t) => t.nivelriesgo),
              label: `Nivel de riesgo (mínimo ${this.nivelRiesgo})`,
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
