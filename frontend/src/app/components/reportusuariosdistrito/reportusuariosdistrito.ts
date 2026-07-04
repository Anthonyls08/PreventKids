import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-reportusuariosdistrito',
  imports: [BaseChartDirective, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './reportusuariosdistrito.html',
  styleUrl: './reportusuariosdistrito.css',
})
export class Reportusuariosdistrito implements OnInit {
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
  barChartType: ChartType = 'line';

  constructor(private uS: Userservice) { }

  ngOnInit(): void {
    // Evitamos llamar al backend durante el prerender SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.uS.getConteoPorDistrito().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.nombreDistrito);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadUsuarios),
            label: 'Cantidad de usuarios',
            backgroundColor: 'rgba(38, 166, 154, 0.3)', // Turquesa claro
            borderColor: '#1e88e5', // Turquesa
            pointBackgroundColor: '#1565c0', // Verde intenso
            fill: true,
          },
        ];
      } else {
        this.hasData = false;
      }
      this.cdr.markForCheck();
    });
  }
}
