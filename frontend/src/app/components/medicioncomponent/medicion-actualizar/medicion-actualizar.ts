import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Medicion } from '../../../models/Medicion';
import { User } from '../../../models/User';

import { Medicionservice } from '../../../services/medicionservice';
import { Userservice } from '../../../services/userservice';

@Component({
  selector: 'app-medicion-actualizar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './medicion-actualizar.html',
  styleUrl: './medicion-actualizar.css',
})
export class MedicionActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  medicion: Medicion = new Medicion();
  id: number = 0;

  listaUsuarios: User[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private medicionService: Medicionservice,
    private userService: Userservice,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idMedicion: [''],
      pesoKg: ['', [Validators.required, Validators.min(0)]],
      tallaCm: ['', [Validators.required, Validators.min(0)]],
      imc: [{ value: 0, disabled: true }],
      clasificacionimc: [{ value: '', disabled: true }],
      presion: ['', [Validators.required, Validators.min(0)]],
      temperatura: ['', [Validators.required, Validators.min(0)]],
      fechamedicion: ['', Validators.required],
      user: ['', Validators.required],
    });

    this.form.get('pesoKg')?.valueChanges.subscribe(() => this.calcularImc());
    this.form.get('tallaCm')?.valueChanges.subscribe(() => this.calcularImc());

    this.userService.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.medicionService.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        idMedicion: data.idMedicion,
        pesoKg: data.pesoKg,
        tallaCm: data.tallaCm,
        imc: data.imc,
        clasificacionimc: data.clasificacionimc,
        presion: data.presion,
        temperatura: data.temperatura,
        fechamedicion: data.fechamedicion,
        user: data.user?.idUser,
      });
    });
  }

  calcularImc() {
    const peso = Number(this.form.get('pesoKg')?.value);
    const tallaCm = Number(this.form.get('tallaCm')?.value);

    if (peso > 0 && tallaCm > 0) {
      const tallaM = tallaCm / 100;
      const imc = peso / (tallaM * tallaM);
      const imcRedondeado = Math.round(imc * 100) / 100;

      this.form.patchValue(
        {
          imc: imcRedondeado,
          clasificacionimc: this.clasificar(imcRedondeado),
        },
        { emitEvent: false },
      );
    }
  }

  clasificar(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }

  aceptar() {
    if (this.form.valid) {
      this.medicion.idMedicion = this.form.value.idMedicion;
      this.medicion.pesoKg = this.form.value.pesoKg;
      this.medicion.tallaCm = this.form.value.tallaCm;
      this.medicion.imc = this.form.getRawValue().imc;
      this.medicion.clasificacionimc = this.form.getRawValue().clasificacionimc;
      this.medicion.presion = this.form.value.presion;
      this.medicion.temperatura = this.form.value.temperatura;
      this.medicion.fechamedicion = this.form.value.fechamedicion;

      // FK: enviamos el id del usuario seleccionado
      this.medicion.idUser = this.form.value.user;

      this.medicionService.update(this.id, this.medicion).subscribe(() => {
        this.router.navigate(['/app/mediciones/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/mediciones/listar']);
  }
}
