import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatIA } from '../../../models/ChatIA';
import { Chatiaservice } from '../../../services/chatiaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-ia-actualizar',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-ia-actualizar.html',
  styleUrl: './chat-ia-actualizar.css',
})
export class ChatIAActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  chat: ChatIA = new ChatIA();
  id: number = 0;

  constructor(
    private cS: Chatiaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.chat.idchatIA = this.form.value.codigo;
      this.chat.pregunta = this.form.value.pregunta;
      this.chat.respuesta = this.form.value.respuesta;
      this.cS.update(this.chat).subscribe({
        next: () => {
          this.router.navigate(['/app/chatia/listar']);
        },
      });
    }
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idchatIA,
        pregunta: data.pregunta,
        respuesta: data.respuesta,
      });
    });
  }
}
