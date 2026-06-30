import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Medicion } from '../../../models/Medicion';
import { Medicionservice } from '../../../services/medicionservice';

@Component({
  selector: 'app-medicion-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './medicion-listar.html',
  styleUrl: './medicion-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicionListar implements OnInit {
  private mS = inject(Medicionservice);

  mediciones = signal<Medicion[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedMediciones = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.mediciones().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarMediciones();
  }

  cargarMediciones() {
    this.mS.list().subscribe({
      next: (data) => {
        this.mediciones.set(data.sort((a, b) => a.idMedicion - b.idMedicion));
      },
    });
  }

  eliminar(id: number) {
    this.mS.eliminar(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mediciones.set(data.sort((a, b) => a.idMedicion - b.idMedicion));
        const maxIndex = Math.max(0, Math.ceil(data.length / this.pageSize()) - 1);
        if (this.pageIndex() > maxIndex) {
          this.pageIndex.set(maxIndex);
        }
      });
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
