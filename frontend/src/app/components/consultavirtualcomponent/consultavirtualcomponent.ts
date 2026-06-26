import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ConsultaVirtualListar } from './consultavirtual-listar/consultavirtual-listar';

@Component({
  selector: 'app-consultavirtualcomponent',
  imports: [RouterOutlet, ConsultaVirtualListar, RouterModule],
  templateUrl: './consultavirtualcomponent.html',
  styleUrl: './consultavirtualcomponent.css',
})
export class Consultavirtualcomponent {
  constructor(public route: ActivatedRoute) {}
}
