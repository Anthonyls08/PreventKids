import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { User } from '../../../models/User';
import { Userservice } from '../../../services/userservice';
import { Roleservice } from '../../../services/roleservice';
import { Districtservice } from '../../../services/districtservice';
import { Role } from '../../../models/Role';
import { District } from '../../../models/district';

@Component({
  selector: 'app-user-listar',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './user-listar.html',
  styleUrl: './user-listar.css',
})
export class UserListar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
  ];

  // Listas relacionadas para mostrar el nombre del rol y distrito (no el id)
  roles: Role[] = [];
  distritos: District[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private uS: Userservice,
    private rS: Roleservice,
    private dS: Districtservice,
  ) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => (this.roles = data));
    this.dS.list().subscribe((data) => (this.distritos = data));
    this.cargarUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  nombreRol(id: number): string {
    const r = this.roles.find((x) => x.idRole === id);
    return r ? r.nombre : 'Rol ' + id;
  }

  nombreDistrito(id: number): string {
    const d = this.distritos.find((x) => x.idDistrict === id);
    return d ? d.nameDistrict : 'Distrito ' + id;
  }

  cargarUsuarios() {
    this.uS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data.sort((a, b) => a.idUser - b.idUser);
      },
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data.sort((a, b) => a.idUser - b.idUser);
      });
    });
  }
}
