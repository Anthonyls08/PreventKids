import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { Roleservice } from '../../../services/roleservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-role-actualizar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './role-actualizar.html',
  styleUrl: './role-actualizar.css',
})
export class RoleActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  id: number = 0;

  nombresRol: string[] = ['ADMIN', 'PACIENTE', 'DOCTOR', 'PADRE'];

  constructor(
    private rS: Roleservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.role.idRole = this.form.value.codigo;
      this.role.nombre = this.form.value.nombre;
      this.role.descripcion = this.form.value.descripcion;
      this.rS.update(this.role).subscribe({
        next: () => {
          this.router.navigate(['/app/roles/listar']);
        },
        error: (e) => {
          console.error('Error al actualizar el rol', e);
        },
      });
    }
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idRole,
        nombre: data.nombre,
        descripcion: data.descripcion,
      });
    });
  }
}
