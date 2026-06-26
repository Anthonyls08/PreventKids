import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Specialty } from '../../../models/Specialty';
import { Specialtyservice } from '../../../services/specialtyservice';
import { NOMBRES_ESPECIALIDAD, AREAS_ESPECIALIDAD } from '../../../data/especialidad-opciones';

@Component({
  selector: 'app-especialidad-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './especialidad-insertar.html',
  styleUrl: './especialidad-insertar.css',
})
export class EspecialidadInsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  specialty: Specialty = new Specialty();

  nombres: string[] = NOMBRES_ESPECIALIDAD;
  areas: string[] = AREAS_ESPECIALIDAD;

  constructor(
    private sS: Specialtyservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      area: ['', Validators.required],
      atencionvirtual: [false],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.specialty.nombre = this.form.value.nombre;
      this.specialty.descripcion = this.form.value.descripcion;
      this.specialty.area = this.form.value.area;
      this.specialty.atencionvirtual = this.form.value.atencionvirtual;

      this.sS.insert(this.specialty).subscribe({
        next: () => {
          this.router.navigate(['/app/specialties/listar']);
        },
        error: (e) => {
          console.error('Error al registrar la especialidad', e);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/specialties/listar']);
  }
}