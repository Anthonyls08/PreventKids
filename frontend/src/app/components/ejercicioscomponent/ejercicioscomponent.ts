import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Ejercicio } from '../../models/Ejercicio';
import { Ejercicioservice } from '../../services/ejercicioservice';

@Component({
  selector: 'app-ejercicioscomponent',
  imports: [MatIconModule],
  templateUrl: './ejercicioscomponent.html',
  styleUrl: './ejercicioscomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ejercicioscomponent implements OnInit {
  private eS = inject(Ejercicioservice);

  ejercicios = signal<Ejercicio[]>([]);
  cargando = signal<boolean>(true);

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
