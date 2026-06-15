import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PhysicalLimitationListar } from './physical-limitation-listar/physical-limitation-listar';

@Component({
  selector: 'app-physicallimitationcomponent',
  imports: [RouterOutlet, PhysicalLimitationListar],
  templateUrl: './physicallimitationcomponent.html',
  styleUrl: './physicallimitationcomponent.css',
})
export class Physicallimitationcomponent {

  constructor(public route: ActivatedRoute) {}
  
}
