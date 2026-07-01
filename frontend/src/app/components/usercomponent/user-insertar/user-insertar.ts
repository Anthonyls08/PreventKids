import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { District } from '../../../models/district';

import { Userservice } from '../../../services/userservice';
import { Roleservice } from '../../../services/roleservice';
import { Districtservice } from '../../../services/districtservice';

@Component({
  selector: 'app-user-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-insertar.html',
  styleUrl: './user-insertar.css',
})
export class UserInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();

  generos: string[] = ['Masculino', 'Femenino', 'Otro'];
  listaRoles: Role[] = [];
  listaDistritos: District[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uS: Userservice,
    private rS: Roleservice,
    private dS: Districtservice,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      fechanacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.min(0)]],
      estado: [true, Validators.required],
      idRole: ['', Validators.required],
      idDistrict: ['', Validators.required],
    });

    this.rS.list().subscribe((data) => (this.listaRoles = data));
    this.dS.list().subscribe((data) => (this.listaDistritos = data));
  }

  aceptar() {
    if (this.form.valid) {
      this.user.nombre = this.form.value.nombre;
      this.user.apellido = this.form.value.apellido;
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.user.fechanacimiento = this.form.value.fechanacimiento;
      this.user.genero = this.form.value.genero;
      this.user.telefono = this.form.value.telefono;
      this.user.estado = this.form.value.estado;
      // FK requeridas
      this.user.idRole = this.form.value.idRole;
      this.user.idDistrict = this.form.value.idDistrict;

      this.uS.insert(this.user).subscribe({
        next: () => {
          this.router.navigate(['/app/users/listar']);
        },
        error: (e) => {
          console.error('Error al registrar el usuario', e);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/users/listar']);
  }
}
