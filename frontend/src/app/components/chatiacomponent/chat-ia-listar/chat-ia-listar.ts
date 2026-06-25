import { Component, OnInit, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ChatIA } from '../../../models/ChatIA';
import { Chatiaservice } from '../../../services/chatiaservice';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-ia-listar',
  imports: [MatCardModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './chat-ia-listar.html',
  styleUrl: './chat-ia-listar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatIAListar implements OnInit {
  private cS = inject(Chatiaservice);

  chats = signal<ChatIA[]>([]);
  pageSize = signal(6);
  pageIndex = signal(0);

  pagedChats = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.chats().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.cargarChats();
  }

  cargarChats() {
    this.cS.list().subscribe({
      next: (data) => {
        this.chats.set(data);
      },
    });
  }

  eliminar(id: number) {
    this.cS.eliminar(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.chats.set(data);
        // Si la página actual quedó vacía, retroceder una página
        const maxIndex = Math.max(0, Math.ceil(data.length / this.pageSize()) - 1);
        if (this.pageIndex() > maxIndex) {
          this.pageIndex.set(maxIndex);
        }
      });
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }
}
