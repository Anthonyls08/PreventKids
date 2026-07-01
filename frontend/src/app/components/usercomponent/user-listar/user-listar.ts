import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { User } from '../../../models/User';
import { Userservice } from '../../../services/userservice';

@Component({
  selector: 'app-user-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './user-listar.html',
  styleUrl: './user-listar.css',
})
export class UserListar implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
  ];

  constructor(private uS: Userservice) {}

  ngOnInit(): void {
    this.cargarUsuarios();
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
