import { Component, OnInit } from '@angular/core';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';
import { TipoContenido } from '../../../models/TipoContenido';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipocontenido-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tipocontenido-listar.html',
  styleUrl: './tipocontenido-listar.css',
})
export class TipocontenidoListar implements OnInit {

  dataSource: MatTableDataSource<TipoContenido> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private tcS: Tipocontenidoservice) {}

  ngOnInit(): void {
    this.cargarTiposContenido();
  }

  cargarTiposContenido() {
    this.tcS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.tcS.eliminar(id).subscribe(() => {
      this.tcS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}