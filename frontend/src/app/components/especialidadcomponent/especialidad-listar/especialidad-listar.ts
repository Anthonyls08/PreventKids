import { Component, OnInit } from '@angular/core';
import { Specialtyservice } from '../../../services/specialtyservice';
import { Specialty } from '../../../models/Specialty';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-especialidad-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './especialidad-listar.html',
  styleUrl: './especialidad-listar.css',
})
export class EspecialidadListar implements OnInit {

  dataSource: MatTableDataSource<Specialty> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private sS: Specialtyservice) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.sS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}