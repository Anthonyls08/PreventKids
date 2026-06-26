import {Component,OnInit,signal,computed,inject,ChangeDetectionStrategy,} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

import { Alert } from '../../../models/Alert';
import { Alertservice } from '../../../services/alertservice';  

@Component({
  selector: 'app-alert-listar',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './alert-listar.html',
  styleUrl: './alert-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListar implements OnInit {
  private aS = inject(Alertservice);

  items = signal<Alert[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas() {
    this.aS.list().subscribe({
      next: (data) => {
        this.items.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.aS.eliminar(id).subscribe(() => {
      this.cargarAlertas();
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}