import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/Role';
import { Roleservice } from '../../../services/roleservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './role-listar.html',
  styleUrl: './role-listar.css',
})
export class RoleListar implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private rS: Roleservice) {}
  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {

      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;

      });
    });
  }
}
