import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Hijo } from '../../../models/Hijo';
import { Hijoservice } from '../../../services/hijoservice';
import { Loginservice } from '../../../services/loginservice';

@Component({
  selector: 'app-hijo-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './hijo-listar.html',
  styleUrl: './hijo-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HijoListar implements OnInit {
  private hS = inject(Hijoservice);
  private loginService = inject(Loginservice);

  hijos = signal<Hijo[]>([]);
  esPadre = signal<boolean>(false);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedHijos = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.hijos().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.esPadre.set(this.loginService.showRole() === 'PADRE');
    this.cargarHijos();
  }

  // El padre ve solo a sus hijos; el doctor y el admin ven todos
  cargarHijos() {
    const peticion = this.esPadre() ? this.hS.misHijos() : this.hS.list();
    peticion.subscribe({
      next: (data) => {
        this.hijos.set(data.sort((a, b) => a.idHijo - b.idHijo));
        const maxIndex = Math.max(0, Math.ceil(data.length / this.pageSize()) - 1);
        if (this.pageIndex() > maxIndex) {
          this.pageIndex.set(maxIndex);
        }
      },
    });
  }

  eliminar(id: number) {
    this.hS.eliminar(id).subscribe(() => this.cargarHijos());
  }

  edad(fechanacimiento: Date | string): number {
    const nacimiento = new Date(fechanacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const cumpleEsteAnio = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    if (hoy < cumpleEsteAnio) {
      edad--;
    }
    return edad;
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
