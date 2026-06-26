import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { VirtualConsultation } from '../../../models/VirtualConsultation';
import { Virtualconsultationservice } from '../../../services/virtualconsultationservice';

@Component({
  selector: 'app-consultavirtual-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './consultavirtual-listar.html',
  styleUrl: './consultavirtual-listar.css',
})
export class ConsultaVirtualListar implements OnInit {
  dataSource: MatTableDataSource<VirtualConsultation> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  constructor(private vS: Virtualconsultationservice) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.vS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.vS.eliminar(id).subscribe(() => {
      this.cargar();
    });
  }
}
