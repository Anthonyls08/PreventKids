import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';

@Component({
  selector: 'app-district-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './district-listar.html',
  styleUrl: './district-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictListar implements OnInit {
  private dS = inject(Districtservice);

  items = signal<District[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarDistritos();
  }

  cargarDistritos() {
    this.dS.list().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.idDistrict - b.idDistrict));
      },
    });
  }

  eliminar(id: number) {
    this.dS.eliminar(id).subscribe(() => {
      this.cargarDistritos();
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
