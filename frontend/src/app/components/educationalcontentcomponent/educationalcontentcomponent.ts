import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EducationalContentListar } from './educational-content-listar/educational-content-listar';

@Component({
  selector: 'app-educationalcontentcomponent',
  imports: [RouterOutlet, EducationalContentListar],
  templateUrl: './educationalcontentcomponent.html',
  styleUrl: './educationalcontentcomponent.css',
})
export class Educationalcontentcomponent {
  constructor(public route: ActivatedRoute) {}
}
