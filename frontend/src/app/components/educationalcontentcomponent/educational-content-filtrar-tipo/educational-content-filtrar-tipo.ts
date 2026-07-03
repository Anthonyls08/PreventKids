import { ChangeDetectorRef, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Educationalcontentservice } from '../../../services/educationalcontentservice';
import { EducationalContent } from '../../../models/EducationalContent';

@Component({
  selector: 'app-educational-content-filtrar-tipo',
  imports: [MatIconModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './educational-content-filtrar-tipo.html',
  styleUrl: './educational-content-filtrar-tipo.css',
})
export class EducationalContentFiltrarTipo {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  tipo = '';
  error = '';

  buscado = false;
  hasData = false;
  total = 0;
  resultados: EducationalContent[] = [];

  constructor(private eS: Educationalcontentservice) {}

  consultar(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.error = '';
    if (this.tipo.trim().length < 3) {
      this.error = 'Escribe al menos 3 caracteres para buscar.';
      return;
    }

    // QUERY (filtro): contenido educativo por tipo
    this.eS.buscarPorTipo(this.tipo.trim()).subscribe({
      next: (data) => {
        this.resultados = data ?? [];
        this.buscado = true;
        this.hasData = this.resultados.length > 0;
        this.total = this.resultados.length;
        this.cdr.markForCheck();
      },
      error: () => {
        this.resultados = [];
        this.buscado = true;
        this.hasData = false;
        this.total = 0;
        this.cdr.markForCheck();
      },
    });
  }
}
