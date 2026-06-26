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
import { Ejercicio } from '../../models/Ejercicio';
import { Ejercicioservice, DIFICULTADES } from '../../services/ejercicioservice';

@Component({
  selector: 'app-ejercicioscomponent',
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatSelectModule],
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
