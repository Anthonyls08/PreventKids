import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-physical-limitation-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './physical-limitation-listar.html',
  styleUrl: './physical-limitation-listar.css',
})
export class PhysicalLimitationListar implements OnInit {
  dataSource: MatTableDataSource<PhysicalLimitation> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private pS: PhysicalLimitationService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

eliminar(element: any) {
  // Imprimimos el objeto completo para ver cómo se llama el campo del ID
  console.log("Objeto recibido:", element); 
  
  // Aquí usamos el ID. Si en el log el campo se llama 'id' usa element.id
  // Si se llama 'idPhysicalLimitation' usa element.idPhysicalLimitation
  const id = element.idPhysicalLimitation; 

  if (!id) {
    alert("¡ERROR! El campo del ID no se llama 'idPhysicalLimitation'. Mira la consola.");
    return;
  }

  this.pS.eliminar(id).subscribe(() => {
    this.cargar(); // Usamos tu método cargar() original para refrescar
  });
}
}