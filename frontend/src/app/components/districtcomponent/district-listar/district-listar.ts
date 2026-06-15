import { Component, OnInit } from '@angular/core';
import { Districtservice } from '../../../services/districtservice';
import { District } from '../../../models/district';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-district-listar',
  imports: [MatTableModule,MatIconModule,MatButtonModule, RouterModule],
  templateUrl: './district-listar.html',
  styleUrl: './district-listar.css',
})
export class DistrictListar implements OnInit{
  dataSource: MatTableDataSource<District> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private dS:Districtservice) {}
  ngOnInit(): void {
    this.cargarDistritos();
  }

  cargarDistritos() {
    this.dS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  eliminar(id: number) {
    this.dS.eliminar(id).subscribe((data) => {

      this.dS.list().subscribe((data) => {
        this.dataSource.data = data;

      });
    });
  }
}
