import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RoleListar } from './role-listar/role-listar';

@Component({
  selector: 'app-rolecomponent',
  imports: [RouterOutlet, RoleListar],
  templateUrl: './rolecomponent.html',
  styleUrl: './rolecomponent.css',
})
export class Rolecomponent {

  constructor(public route: ActivatedRoute) {}
}
