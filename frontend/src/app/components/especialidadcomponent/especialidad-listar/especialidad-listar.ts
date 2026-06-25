import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Specialtyservice } from '../../../services/specialtyservice';
import { Specialty } from '../../../models/Specialty';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-especialidad-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './especialidad-listar.html',
  styleUrl: './especialidad-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EspecialidadListar implements OnInit {
  private sS = inject(Specialtyservice);

  items = signal<Specialty[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.sS.list().subscribe({
      next: (data) => {
        this.items.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.items.set(data);
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
