import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { VirtualConsultation } from '../../../models/VirtualConsultation';
import { Virtualconsultationservice } from '../../../services/virtualconsultationservice';

@Component({
  selector: 'app-consultavirtual-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './consultavirtual-listar.html',
  styleUrl: './consultavirtual-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaVirtualListar implements OnInit {
  private vS = inject(Virtualconsultationservice);

  items = signal<VirtualConsultation[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.vS.list().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.idVirtualConsultation - b.idVirtualConsultation));
      },
    });
  }

  eliminar(id: number) {
    this.vS.eliminar(id).subscribe(() => {
      this.cargar();
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
