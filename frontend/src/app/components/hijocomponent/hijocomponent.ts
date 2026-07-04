import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HijoListar } from './hijo-listar/hijo-listar';

@Component({
  selector: 'app-hijocomponent',
  imports: [RouterOutlet, HijoListar],
  templateUrl: './hijocomponent.html',
  styleUrl: './hijocomponent.css',
})
export class Hijocomponent {
  constructor(public route: ActivatedRoute) {}
}
