import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';

@Component({
  selector: 'app-physical-limitation-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './physical-limitation-listar.html',
  styleUrl: './physical-limitation-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhysicalLimitationListar implements OnInit {
  private pS = inject(PhysicalLimitationService);

  items = signal<PhysicalLimitation[]>([]);
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
    this.pS.list().subscribe((data) => {
      this.items.set(data.sort((a, b) => a.idPhysicalLimitation - b.idPhysicalLimitation));
    });
  }

  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.cargar();
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
