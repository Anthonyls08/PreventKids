import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Virtualconsultationservice } from '../../../services/virtualconsultationservice';
import { VirtualConsultation } from '../../../models/VirtualConsultation';

@Component({
  selector: 'app-consultavirtual-decidir-prioridad',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './consultavirtual-decidir-prioridad.html',
  styleUrl: './consultavirtual-decidir-prioridad.css',
})
export class ConsultavirtualDecidirPrioridad {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  // Mismos estados que usa el formulario de registro de consultas
  estados: string[] = ['Pendiente', 'Confirmada', 'En curso', 'Finalizada', 'Cancelada'];
  estado = this.estados[0];
  nombrePaciente = '';

  buscado = false;
  hasData = false;
  total = 0;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];

  constructor(private vS: Virtualconsultationservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId) || !this.estado || !this.nombrePaciente.trim()) {
      return;
    }

    // QUERY (decision): consultas por estado y nombre del paciente
    this.vS.decidirPrioridad(this.estado, this.nombrePaciente.trim()).subscribe((data) => {
      const lista: VirtualConsultation[] = data ?? [];
      this.buscado = true;

      if (lista.length > 0) {
        this.hasData = true;
        this.total = lista.length;

        // Distribucion de las consultas encontradas por proveedor de la sala
        const conteo = new Map<string, number>();
        lista.forEach((v) => {
          const key = v.proveedor || 'Sin proveedor';
          conteo.set(key, (conteo.get(key) ?? 0) + 1);
        });

        this.chartLabels = Array.from(conteo.keys());
        this.chartData = [
          {
            data: Array.from(conteo.values()),
            label: `Consultas ${this.estado} de ${this.nombrePaciente.trim()} por proveedor`,
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
