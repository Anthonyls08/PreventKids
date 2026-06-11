import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChatIAListar } from './chat-ia-listar/chat-ia-listar';

@Component({
  selector: 'app-chatiacomponent',
  imports: [RouterOutlet,ChatIAListar],
  templateUrl: './chatiacomponent.html',
  styleUrl: './chatiacomponent.css',
})
export class Chatiacomponent {

  constructor(public route:ActivatedRoute){}
}
