import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';

@Component({
  selector: 'app-physical-limitation-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './physical-limitation-actualizar.html',
  styleUrl: './physical-limitation-actualizar.css',
})
export class PhysicalLimitationActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  limitacion: PhysicalLimitation = new PhysicalLimitation();
  id: number = 0;

  constructor(
    private pS: PhysicalLimitationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      ejerciciosProhibidos: ['', Validators.required],
      intensidad: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.limitacion.idPhysicalLimitation = this.form.value.codigo;
      this.limitacion.nameLimitation = this.form.value.nombre;
      this.limitacion.descriptionLimitation = this.form.value.descripcion;
      this.limitacion.categoryLimitation = this.form.value.categoria;
      this.limitacion.prohibitedExercises = this.form.value.ejerciciosProhibidos;
      this.limitacion.intensityLimitation = this.form.value.intensidad;

      this.pS.update(this.limitacion).subscribe({
        next: () => {
          this.router.navigate(['/app/limitacion-fisica/listar']);
        },
      });
    }
  }

  init() {
    this.pS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idPhysicalLimitation,
        nombre: data.nameLimitation,
        descripcion: data.descriptionLimitation,
        categoria: data.categoryLimitation,
        ejerciciosProhibidos: data.prohibitedExercises,
        intensidad: data.intensityLimitation,
      });
    });
  }
}
