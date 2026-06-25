import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TipoAlerta } from '../../../models/TipoAlerta';
import { Tipoalertaservice } from '../../../services/tipoalertaservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipo-alerta-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatInputModule, RouterLink],
  templateUrl: './tipo-alerta-listar.html',
  styleUrl: './tipo-alerta-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipoAlertaListar implements OnInit {
  private tS = inject(Tipoalertaservice);

  items = signal<TipoAlerta[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarTiposAlerta();
  }

  cargarTiposAlerta() {
    this.tS.list().subscribe({
      next: (data) => {
        this.items.set(data);
      },
    });
  }

  buscar(nombre: string) {
    this.pageIndex.set(0);
    if (nombre.trim().length === 0) {
      this.cargarTiposAlerta();
      return;
    }
    this.tS.buscar(nombre.trim()).subscribe({
      next: (data) => {
        this.items.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.tS.eliminar(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
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
