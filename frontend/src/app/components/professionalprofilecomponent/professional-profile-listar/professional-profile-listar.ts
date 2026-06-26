import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProfessionalProfile } from '../../../models/ProfessionalProfile';
import { Professionalprofileservice } from '../../../services/professionalprofileservice';
import { Userservice } from '../../../services/userservice';
import { Specialtyservice } from '../../../services/specialtyservice';
import { User } from '../../../models/User';
import { Specialty } from '../../../models/Specialty';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professional-profile-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './professional-profile-listar.html',
  styleUrl: './professional-profile-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalProfileListar implements OnInit {
  private ppS = inject(Professionalprofileservice);
  private uS = inject(Userservice);
  private sS = inject(Specialtyservice);

  perfiles = signal<ProfessionalProfile[]>([]);
  usuarios = signal<User[]>([]);
  especialidades = signal<Specialty[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedPerfiles = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.perfiles().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.uS.list().subscribe((data) => this.usuarios.set(data));
    this.sS.list().subscribe((data) => this.especialidades.set(data));
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    this.ppS.list().subscribe({
      next: (data) => {
        this.perfiles.set(data);
      },
    });
  }

  nombreUsuario(id: number): string {
    const u = this.usuarios().find((x) => x.idUser === id);
    return u ? `${u.nombre} ${u.apellido}` : 'Usuario ' + id;
  }

  nombreEspecialidad(id: number): string {
    const s = this.especialidades().find((x) => x.idSpecialty === id);
    return s ? s.nombre : 'Especialidad ' + id;
  }

  eliminar(id: number) {
    this.ppS.eliminar(id).subscribe(() => {
      this.ppS.list().subscribe((data) => {
        this.perfiles.set(data);
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
