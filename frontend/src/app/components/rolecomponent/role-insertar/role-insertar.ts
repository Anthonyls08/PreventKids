import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { Roleservice } from '../../../services/roleservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-role-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './role-insertar.html',
  styleUrl: './role-insertar.css',
})
export class RoleInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();

  nombresRol: string[] = ['ADMIN', 'DOCTOR', 'PADRE'];

  constructor(
    private rS: Roleservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.role.nombre = this.form.value.nombre;
      this.role.descripcion = this.form.value.descripcion;
      this.rS.insert(this.role).subscribe({
        next: () => {
          this.router.navigate(['/app/roles/listar']);
        },
        error: (e) => {
          console.error('Error al registrar el rol', e);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/roles/listar']);
  }
}
