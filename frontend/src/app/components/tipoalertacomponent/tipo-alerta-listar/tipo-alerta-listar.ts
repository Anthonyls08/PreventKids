import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoAlerta } from '../../../models/TipoAlerta';
import { Tipoalertaservice } from '../../../services/tipoalertaservice';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipo-alerta-listar',
  imports: [MatTableModule,MatIconModule,MatButtonModule,MatInputModule,RouterLink],
  templateUrl: './tipo-alerta-listar.html',
  styleUrl: './tipo-alerta-listar.css',
})
export class TipoAlertaListar implements OnInit {
  dataSource: MatTableDataSource<TipoAlerta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private tS: Tipoalertaservice) {}
  ngOnInit(): void {
    this.cargarTiposAlerta();
  }

  cargarTiposAlerta() {
    this.tS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  buscar(nombre: string) {
    if (nombre.trim().length === 0) {
      this.cargarTiposAlerta();
      return;
    }
    this.tS.buscar(nombre.trim()).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.tS.eliminar(id).subscribe((data) => {

      this.tS.list().subscribe((data) => {
        this.dataSource.data = data;

      });
    });
  }
}
