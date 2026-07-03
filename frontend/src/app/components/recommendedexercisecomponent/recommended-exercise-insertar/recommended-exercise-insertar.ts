import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecommendedExercise } from '../../../models/RecommendedExercise';
import { Recommendedexerciseservice } from '../../../services/recommendedexerciseservice';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recommended-exercise-insertar',
  imports: [MatInputModule, MatButtonModule, MatSelectModule, RouterLink, ReactiveFormsModule],
  templateUrl: './recommended-exercise-insertar.html',
  styleUrl: './recommended-exercise-insertar.css',
})
export class RecommendedExerciseInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  ejercicio: RecommendedExercise = new RecommendedExercise();
  limitaciones = signal<PhysicalLimitation[]>([]);

  constructor(
    private reS: Recommendedexerciseservice,
    private plS: PhysicalLimitationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameRecommendedExercise: ['', Validators.required],
      descriptionReExercise: ['', Validators.required],
      difficultRecommendedExercise: ['', Validators.required],
      durationRecommendedExercise: ['', [Validators.required, Validators.min(1)]],
      dateRecommendedExercise: ['', Validators.required],
      idPhysicalLimitation: ['', Validators.required],
    });

    this.plS.list().subscribe((data) => {
      this.limitaciones.set(data);
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.ejercicio.nameRecommendedExercise = this.form.value.nameRecommendedExercise;
      this.ejercicio.descriptionReExercise = this.form.value.descriptionReExercise;
      this.ejercicio.difficultRecommendedExercise = this.form.value.difficultRecommendedExercise;
      this.ejercicio.durationRecommendedExercise = this.form.value.durationRecommendedExercise;
      this.ejercicio.dateRecommendedExercise = this.form.value.dateRecommendedExercise;
      this.ejercicio.idPhysicalLimitation = this.form.value.idPhysicalLimitation;
      this.reS.insert(this.ejercicio).subscribe({
        next: () => {
          this.router.navigate(['/app/ejercicio-recomendado/listar']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
