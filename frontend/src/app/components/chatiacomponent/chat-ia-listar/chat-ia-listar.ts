import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChatIA } from '../../../models/ChatIA';
import { Chatiaservice } from '../../../services/chatiaservice';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-ia-listar',
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './chat-ia-listar.html',
  styleUrl: './chat-ia-listar.css',
})
export class ChatIAListar implements OnInit {
  dataSource: MatTableDataSource<ChatIA> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private cS: Chatiaservice) {}
  ngOnInit(): void {
    this.cargarChats();
  }

  cargarChats() {
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.cS.eliminar(id).subscribe((data) => {

      this.cS.list().subscribe((data) => {
        this.dataSource.data = data;

      });
    });
  }
}
