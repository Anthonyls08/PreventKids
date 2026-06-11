import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChatIA } from '../../../models/ChatIA';
import { Chatiaservice } from '../../../services/chatiaservice';

@Component({
  selector: 'app-chat-ia-listar',
  imports: [MatTableModule],
  templateUrl: './chat-ia-listar.html',
  styleUrl: './chat-ia-listar.css',
})
export class ChatIAListar implements OnInit {
  dataSource: MatTableDataSource<ChatIA> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

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
}
