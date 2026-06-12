import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { DistrictListar } from './district-listar/district-listar';

@Component({
  selector: 'app-districtcomponent',
  imports: [RouterOutlet, DistrictListar, RouterModule],
  templateUrl: './districtcomponent.html',
  styleUrl: './districtcomponent.css',
})
export class Districtcomponent {
  constructor(public route: ActivatedRoute) {}
}