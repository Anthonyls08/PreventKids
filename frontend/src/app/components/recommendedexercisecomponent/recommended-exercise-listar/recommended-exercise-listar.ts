import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RecommendedExercise } from '../../../models/RecommendedExercise';
import { Recommendedexerciseservice } from '../../../services/recommendedexerciseservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommended-exercise-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './recommended-exercise-listar.html',
  styleUrl: './recommended-exercise-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedExerciseListar implements OnInit {
  private reS = inject(Recommendedexerciseservice);

  ejercicios = signal<RecommendedExercise[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedEjercicios = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.ejercicios().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios() {
    this.reS.list().subscribe({
      next: (data) => {
        this.ejercicios.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.reS.eliminar(id).subscribe(() => {
      this.reS.list().subscribe((data) => {
        this.ejercicios.set(data);
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
