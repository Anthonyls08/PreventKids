import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserListar } from './user-listar/user-listar';

@Component({
  selector: 'app-usercomponent',
  imports: [RouterOutlet, UserListar],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
})
export class Usercomponent {
  constructor(public route: ActivatedRoute) {}
}
