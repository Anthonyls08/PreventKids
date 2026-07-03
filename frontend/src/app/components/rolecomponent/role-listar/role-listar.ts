import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Role } from '../../../models/Role';
import { Roleservice } from '../../../services/roleservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './role-listar.html',
  styleUrl: './role-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListar implements OnInit {
  private rS = inject(Roleservice);

  items = signal<Role[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rS.list().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.idRole - b.idRole));
      },
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.items.set(data.sort((a, b) => a.idRole - b.idRole));
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
