import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProfessionalProfileListar } from './professional-profile-listar/professional-profile-listar';

@Component({
  selector: 'app-professionalprofilecomponent',
  imports: [RouterOutlet, ProfessionalProfileListar],
  templateUrl: './professionalprofilecomponent.html',
  styleUrl: './professionalprofilecomponent.css',
})
export class Professionalprofilecomponent {
  constructor(public route: ActivatedRoute) {}
}
