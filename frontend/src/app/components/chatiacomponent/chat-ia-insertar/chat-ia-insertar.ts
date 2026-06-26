import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatIA } from '../../../models/ChatIA';
import { Chatiaservice } from '../../../services/chatiaservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-chat-ia-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-ia-insertar.html',
  styleUrl: './chat-ia-insertar.css',
})
export class ChatIAInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  chat: ChatIA = new ChatIA();

  constructor(
    private cS: Chatiaservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.chat.pregunta = this.form.value.pregunta;
      this.chat.respuesta = this.form.value.respuesta;
      this.cS.insert(this.chat).subscribe({
        next: () => {
          this.router.navigate(['/app/chatia/listar']);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/chatia/listar']);
  }
}
