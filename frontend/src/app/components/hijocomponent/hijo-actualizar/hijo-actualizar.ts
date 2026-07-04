import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Hijo } from '../../../models/Hijo';
import { PhysicalLimitation } from '../../../models/physical-limitation';

import { Hijoservice } from '../../../services/hijoservice';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';

@Component({
  selector: 'app-hijo-actualizar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './hijo-actualizar.html',
  styleUrl: './hijo-actualizar.css',
})
export class HijoActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  hijo: Hijo = new Hijo();
  id: number = 0;

  listaLimitaciones: PhysicalLimitation[] = [];
  generos = ['Masculino', 'Femenino'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private hijoService: Hijoservice,
    private limitacionService: PhysicalLimitationService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      limitacion: [0],
    });

    this.limitacionService.list().subscribe((data) => {
      this.listaLimitaciones = data;
    });

    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.hijoService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          fechanacimiento: data.fechanacimiento,
          genero: data.genero,
          limitacion: data.physicallimitation?.idPhysicalLimitation ?? 0,
        });
      });
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.hijo.idHijo = this.id;
      this.hijo.nombre = this.form.value.nombre;
      this.hijo.apellido = this.form.value.apellido;
      this.hijo.fechanacimiento = this.form.value.fechanacimiento;
      this.hijo.genero = this.form.value.genero;
      this.hijo.idPhysicalLimitation = Number(this.form.value.limitacion);

      this.hijoService.update(this.hijo).subscribe(() => {
        this.router.navigate(['/app/hijos/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/hijos/listar']);
  }
}
