import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { EspecialidadListar } from './especialidad-listar/especialidad-listar';

@Component({
  selector: 'app-especialidadcomponent',
  imports: [RouterOutlet, EspecialidadListar, RouterModule],
  templateUrl: './especialidadcomponent.html',
  styleUrl: './especialidadcomponent.css',
})
export class Especialidadcomponent {
  constructor(public route: ActivatedRoute) {}
}