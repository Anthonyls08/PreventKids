import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Specialty } from '../../../models/Specialty';
import { Specialtyservice } from '../../../services/specialtyservice';
import { NOMBRES_ESPECIALIDAD, AREAS_ESPECIALIDAD } from '../../../data/especialidad-opciones';

@Component({
  selector: 'app-especialidad-actualizar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './especialidad-actualizar.html',
  styleUrl: './especialidad-actualizar.css',
})
export class EspecialidadActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  specialty: Specialty = new Specialty();
  id: number = 0;

  nombres: string[] = NOMBRES_ESPECIALIDAD;
  areas: string[] = AREAS_ESPECIALIDAD;

  constructor(
    private sS: Specialtyservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      area: ['', Validators.required],
      atencionvirtual: [false],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.specialty.idSpecialty = this.form.value.codigo;
      this.specialty.nombre = this.form.value.nombre;
      this.specialty.descripcion = this.form.value.descripcion;
      this.specialty.area = this.form.value.area;
      this.specialty.atencionvirtual = this.form.value.atencionvirtual;
      this.sS.update(this.specialty).subscribe({
        next: () => {
          this.router.navigate(['/app/specialties/listar']);
        },
        error: (e) => {
          console.error('Error al actualizar la especialidad', e);
        },
      });
    }
  }

  init() {
    this.sS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idSpecialty,
        nombre: data.nombre,
        descripcion: data.descripcion,
        area: data.area,
        atencionvirtual: data.atencionvirtual,
      });
    });
  }
}
