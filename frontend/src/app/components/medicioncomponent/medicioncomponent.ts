import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MedicionListar } from './medicion-listar/medicion-listar';

@Component({
  selector: 'app-medicioncomponent',
  imports: [RouterOutlet, MedicionListar],
  templateUrl: './medicioncomponent.html',
  styleUrl: './medicioncomponent.css',
})
export class Medicioncomponent {
  constructor(public route: ActivatedRoute) {}
}
