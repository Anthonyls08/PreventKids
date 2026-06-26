import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecommendedExerciseListar } from './recommended-exercise-listar/recommended-exercise-listar';

@Component({
  selector: 'app-recommendedexercisecomponent',
  imports: [RouterOutlet, RecommendedExerciseListar],
  templateUrl: './recommendedexercisecomponent.html',
  styleUrl: './recommendedexercisecomponent.css',
})
export class Recommendedexercisecomponent {
  constructor(public route: ActivatedRoute) {}
}
