import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Specialtyservice } from '../../../services/specialtyservice';
import { Specialty } from '../../../models/Specialty';
import { AREAS_ESPECIALIDAD } from '../../../data/especialidad-opciones';

@Component({
  selector: 'app-especialidad-buscar-area',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './especialidad-buscar-area.html',
  styleUrl: './especialidad-buscar-area.css',
})
export class EspecialidadBuscarArea {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  // Opciones fijas del desplegable (no se escribe, se elige)
  areas: string[] = AREAS_ESPECIALIDAD;
  area = this.areas[0] ?? '';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private sS: Specialtyservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || !this.area) {
      return;
    }

    // QUERY (busqueda): especialidades por area
    this.sS.buscarPorArea(this.area).subscribe((data) => {
      const lista: Specialty[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion: cuantas atienden virtual y cuantas solo presencial
        const conteo = new Map<string, number>();
        lista.forEach((s) => {
          const key = s.atencionvirtual ? 'Con atención virtual' : 'Solo presencial';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Especialidades del área ${this.area}`,
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
