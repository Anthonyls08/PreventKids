import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { EducationalContent } from '../../../models/EducationalContent';
import { Educationalcontentservice } from '../../../services/educationalcontentservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-educational-content-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './educational-content-listar.html',
  styleUrl: './educational-content-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationalContentListar implements OnInit {
  private eS = inject(Educationalcontentservice);

  contenidos = signal<EducationalContent[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedContenidos = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.contenidos().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarContenidos();
  }

  cargarContenidos() {
    this.eS.list().subscribe({
      next: (data) => {
        this.contenidos.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.eS.eliminar(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.contenidos.set(data);
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
