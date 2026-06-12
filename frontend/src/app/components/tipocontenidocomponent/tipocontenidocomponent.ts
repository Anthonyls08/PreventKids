import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { TipocontenidoListar } from './tipocontenido-listar/tipocontenido-listar';

@Component({
  selector: 'app-tipocontenidocomponent',
  imports: [RouterOutlet, TipocontenidoListar, RouterModule],
  templateUrl: './tipocontenidocomponent.html',
  styleUrl: './tipocontenidocomponent.css',
})
export class Tipocontenidocomponent {
  constructor(public route: ActivatedRoute) {}
}