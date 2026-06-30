import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';
import { TipoContenido } from '../../../models/TipoContenido';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipocontenido-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tipocontenido-listar.html',
  styleUrl: './tipocontenido-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipocontenidoListar implements OnInit {
  private tcS = inject(Tipocontenidoservice);

  items = signal<TipoContenido[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarTiposContenido();
  }

  cargarTiposContenido() {
    this.tcS.list().subscribe((data) => {
      this.items.set(data.sort((a, b) => a.idTipocontenido - b.idTipocontenido));
    });
  }

  eliminar(id: number) {
    this.tcS.eliminar(id).subscribe(() => {
      this.tcS.list().subscribe((data) => {
        this.items.set(data.sort((a, b) => a.idTipocontenido - b.idTipocontenido));
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
