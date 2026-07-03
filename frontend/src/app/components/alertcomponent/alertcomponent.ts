import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AlertListar } from './alert-listar/alert-listar';

@Component({
  selector: 'app-alertcomponent',
  imports: [RouterOutlet],
  templateUrl: './alertcomponent.html',
  styleUrl: './alertcomponent.css',
})
export class Alertcomponent {
  constructor(public route: ActivatedRoute) {}
}