import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Professionalprofileservice } from '../../services/professionalprofileservice';

@Component({
  selector: 'app-reportperfilesespecialidad',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './reportperfilesespecialidad.html',
  styleUrl: './reportperfilesespecialidad.css',
})
export class Reportperfilesespecialidad implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // La app es zoneless: hay que avisar a Angular cuando llega la data del backend.
  private cdr = inject(ChangeDetectorRef);

  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //npm install chart.js ng2-charts
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'pie';

  constructor(private ppS: Professionalprofileservice) { }

  ngOnInit(): void {
    // Evitamos llamar al backend durante el prerender SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.ppS.getConteoPorEspecialidad().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.nombreEspecialidad);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadPerfiles),
            label: 'Cantidad de perfiles profesionales',
            backgroundColor: [
              '#1565c0', // Verde intenso
              '#1e88e5', // Turquesa
              '#66bb6a', // Verde claro
              '#26a69a', // Turquesa claro
              '#0d47a1', // Verde oscuro
              '#80cbc4', // Turquesa suave
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
      this.cdr.markForCheck();
    });
  }
}
