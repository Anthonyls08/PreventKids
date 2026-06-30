import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Ejercicio } from '../../models/Ejercicio';
import { Ejercicioservice, DIFICULTADES } from '../../services/ejercicioservice';

@Component({
  selector: 'app-ejercicioscomponent',
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule],
  templateUrl: './ejercicioscomponent.html',
  styleUrl: './ejercicioscomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ejercicioscomponent implements OnInit {
  private eS = inject(Ejercicioservice);

  ejercicios = signal<Ejercicio[]>([]);
  cargando = signal<boolean>(true);

  // Filtros enlazados a los selects.
  filtroNombre = signal<string>('');
  filtroDificultad = signal<string>('');

  readonly dificultades = DIFICULTADES;

  // Nombres disponibles para el select, derivados de los datos de la API.
  nombres = computed(() => this.ejercicios().map((e) => e.nombre));

  // Lista resultante tras aplicar ambos filtros.
  ejerciciosFiltrados = computed(() => {
    const nombre = this.filtroNombre();
    const dificultad = this.filtroDificultad();
    return this.ejercicios().filter(
      (e) =>
        (nombre === '' || e.nombre === nombre) &&
        (dificultad === '' || e.dificultad === dificultad)
    );
  });

  // --- Paginación ---
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedEjercicios = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.ejerciciosFiltrados().slice(start, start + this.pageSize());
  });

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }

  // Al cambiar un filtro, se vuelve a la primera página.
  setFiltroNombre(v: string) {
    this.filtroNombre.set(v);
    this.pageIndex.set(0);
  }

  setFiltroDificultad(v: string) {
    this.filtroDificultad.set(v);
    this.pageIndex.set(0);
  }

  ngOnInit(): void {
    this.eS.list().subscribe({
      next: (data) => {
        this.ejercicios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }
}
