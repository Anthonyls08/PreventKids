import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Hijo } from '../../../models/Hijo';
import { User } from '../../../models/User';
import { PhysicalLimitation } from '../../../models/physical-limitation';

import { Hijoservice } from '../../../services/hijoservice';
import { Loginservice } from '../../../services/loginservice';
import { Userservice } from '../../../services/userservice';
import { Roleservice } from '../../../services/roleservice';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';

@Component({
  selector: 'app-hijo-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './hijo-insertar.html',
  styleUrl: './hijo-insertar.css',
})
export class HijoInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  hijo: Hijo = new Hijo();

  // Solo el admin elige el padre; el padre autenticado se asigna solo (token)
  esAdmin = false;
  listaPadres: User[] = [];
  listaLimitaciones: PhysicalLimitation[] = [];

  generos = ['Masculino', 'Femenino'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hijoService: Hijoservice,
    private loginService: Loginservice,
    private userService: Userservice,
    private roleService: Roleservice,
    private limitacionService: PhysicalLimitationService,
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.loginService.showRole() === 'ADMIN';

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      limitacion: [0],
      padre: [0, this.esAdmin ? Validators.min(1) : []],
    });

    this.limitacionService.list().subscribe((data) => {
      this.listaLimitaciones = data;
    });

    // El admin necesita elegir a qué padre pertenece el hijo
    if (this.esAdmin) {
      this.roleService.list().subscribe((roles) => {
        const rolPadre = roles.find((r) => r.nombre?.toUpperCase() === 'PADRE');
        if (rolPadre) {
          this.userService.list().subscribe((users) => {
            this.listaPadres = users.filter((u) => u.idRole === rolPadre.idRole);
          });
        }
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      this.hijo.nombre = this.form.value.nombre;
      this.hijo.apellido = this.form.value.apellido;
      this.hijo.fechanacimiento = this.form.value.fechanacimiento;
      this.hijo.genero = this.form.value.genero;
      this.hijo.idPhysicalLimitation = Number(this.form.value.limitacion);
      this.hijo.idUser = Number(this.form.value.padre);

      this.hijoService.insert(this.hijo).subscribe(() => {
        this.router.navigate(['/app/hijos/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/hijos/listar']);
  }
}
