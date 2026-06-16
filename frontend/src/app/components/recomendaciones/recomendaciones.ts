import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Recomendacion } from '../../models/Recomendacion';
import { Recommendationservice } from '../../services/recommendationservice';

@Component({
  selector: 'app-recomendaciones',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './recomendaciones.html',
  styleUrl: './recomendaciones.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recomendaciones implements OnInit, OnDestroy {
  private recoService = inject(Recommendationservice);
  private platformId = inject(PLATFORM_ID);

  readonly recomendaciones = signal<Recomendacion[]>([]);
  readonly indice = signal<number>(0);
  readonly cargando = signal<boolean>(true);

  readonly actual = computed<Recomendacion | undefined>(
    () => this.recomendaciones()[this.indice()]
  );

  private intervalo: ReturnType<typeof setInterval> | undefined;
  private readonly INTERVALO_MS = 5000;

  ngOnInit(): void {
    this.recoService.getRecomendaciones().subscribe({
      next: (data) => {
        this.recomendaciones.set(data);
        this.cargando.set(false);
        this.iniciarRotacion();
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.detenerRotacion();
  }

  siguiente(): void {
    const total = this.recomendaciones().length;
    if (total === 0) {
      return;
    }
    this.indice.update((i) => (i + 1) % total);
  }

  anterior(): void {
    const total = this.recomendaciones().length;
    if (total === 0) {
      return;
    }
    this.indice.update((i) => (i - 1 + total) % total);
  }

  irA(i: number): void {
    this.indice.set(i);
    this.reiniciarRotacion();
  }

  private iniciarRotacion(): void {
    // setInterval solo corre en el navegador, nunca en SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.intervalo = setInterval(() => this.siguiente(), this.INTERVALO_MS);
  }

  private detenerRotacion(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = undefined;
    }
  }

  private reiniciarRotacion(): void {
    this.detenerRotacion();
    this.iniciarRotacion();
  }
}
