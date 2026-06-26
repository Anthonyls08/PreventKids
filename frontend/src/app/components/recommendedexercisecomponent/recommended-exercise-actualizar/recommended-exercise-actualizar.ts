import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecommendedExercise } from '../../../models/RecommendedExercise';
import { Recommendedexerciseservice } from '../../../services/recommendedexerciseservice';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recommended-exercise-actualizar',
  imports: [MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './recommended-exercise-actualizar.html',
  styleUrl: './recommended-exercise-actualizar.css',
})
export class RecommendedExerciseActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  ejercicio: RecommendedExercise = new RecommendedExercise();
  id: number = 0;
  limitaciones = signal<PhysicalLimitation[]>([]);

  constructor(
    private reS: Recommendedexerciseservice,
    private plS: PhysicalLimitationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
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
      this.ejercicio.idRecommendedExercise = this.form.value.codigo;
      this.ejercicio.nameRecommendedExercise = this.form.value.nameRecommendedExercise;
      this.ejercicio.descriptionReExercise = this.form.value.descriptionReExercise;
      this.ejercicio.difficultRecommendedExercise = this.form.value.difficultRecommendedExercise;
      this.ejercicio.durationRecommendedExercise = this.form.value.durationRecommendedExercise;
      this.ejercicio.dateRecommendedExercise = this.form.value.dateRecommendedExercise;
      this.ejercicio.idPhysicalLimitation = this.form.value.idPhysicalLimitation;
      this.reS.update(this.ejercicio).subscribe({
        next: () => {
          this.router.navigate(['/app/ejercicio-recomendado/listar']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  init() {
    this.reS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idRecommendedExercise,
        nameRecommendedExercise: data.nameRecommendedExercise,
        descriptionReExercise: data.descriptionReExercise,
        difficultRecommendedExercise: data.difficultRecommendedExercise,
        durationRecommendedExercise: data.durationRecommendedExercise,
        dateRecommendedExercise: data.dateRecommendedExercise,
        idPhysicalLimitation: data.idPhysicalLimitation,
      });
    });
  }
}
