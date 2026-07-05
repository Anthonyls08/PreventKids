import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { VirtualConsultation } from '../../../models/VirtualConsultation';
import { Virtualconsultationservice } from '../../../services/virtualconsultationservice';
import { Userservice } from '../../../services/userservice';
import { Professionalprofileservice } from '../../../services/professionalprofileservice';
import { User } from '../../../models/User';
import { ProfessionalProfile } from '../../../models/ProfessionalProfile';

@Component({
  selector: 'app-consultavirtual-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './consultavirtual-listar.html',
  styleUrl: './consultavirtual-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaVirtualListar implements OnInit {
  private vS = inject(Virtualconsultationservice);
  private uS = inject(Userservice);
  private ppS = inject(Professionalprofileservice);

  items = signal<VirtualConsultation[]>([]);
  // Listas relacionadas para mostrar nombres en vez de ids
  usuarios = signal<User[]>([]);
  perfiles = signal<ProfessionalProfile[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    // GET /users es solo ADMIN: si un DOCTOR/PADRE no puede listarlos,
    // los nombres caen al id sin romper la pantalla (403 silencioso).
    this.uS.list().subscribe({
      next: (data) => this.usuarios.set(data),
      error: () => this.usuarios.set([]),
    });
    this.ppS.list().subscribe({
      next: (data) => this.perfiles.set(data),
      error: () => this.perfiles.set([]),
    });
    this.cargar();
  }

  nombrePaciente(id: number): string {
    const u = this.usuarios().find((x) => x.idUser === id);
    return u ? `${u.nombre} ${u.apellido}` : 'Usuario ' + id;
  }

  nombrePerfil(id: number): string {
    const p = this.perfiles().find((x) => x.idProfessionalProfile === id);
    if (!p) {
      return 'Perfil ' + id;
    }
    const u = this.usuarios().find((x) => x.idUser === p.idUser);
    const doctor = u ? `${u.nombre} ${u.apellido}` : p.institucion;
    return `${doctor} (${p.numerocolegiatura})`;
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
