import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Medicion } from '../../../models/Medicion';
import { Hijo } from '../../../models/Hijo';

import { Medicionservice } from '../../../services/medicionservice';
import { Hijoservice } from '../../../services/hijoservice';

@Component({
  selector: 'app-medicion-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './medicion-insertar.html',
  styleUrl: './medicion-insertar.css',
})
export class MedicionInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  medicion: Medicion = new Medicion();

  listaHijos: Hijo[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private medicionService: Medicionservice,
    private hijoService: Hijoservice,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pesoKg: ['', [Validators.required, Validators.min(0)]],
      tallaCm: ['', [Validators.required, Validators.min(0)]],
      imc: [{ value: 0, disabled: true }],
      clasificacionimc: [{ value: '', disabled: true }],
      presion: ['', [Validators.required, Validators.min(0)]],
      temperatura: ['', [Validators.required, Validators.min(0)]],
      fechamedicion: ['', Validators.required],
      hijo: ['', Validators.required],
    });

    // Recalcular el IMC automáticamente al cambiar peso o talla
    this.form.get('pesoKg')?.valueChanges.subscribe(() => this.calcularImc());
    this.form.get('tallaCm')?.valueChanges.subscribe(() => this.calcularImc());

    this.hijoService.list().subscribe((data) => {
      this.listaHijos = data;
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
    } else {
      this.form.patchValue({ imc: 0, clasificacionimc: '' }, { emitEvent: false });
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
      this.medicion.pesoKg = this.form.value.pesoKg;
      this.medicion.tallaCm = this.form.value.tallaCm;
      this.medicion.imc = this.form.getRawValue().imc;
      this.medicion.clasificacionimc = this.form.getRawValue().clasificacionimc;
      this.medicion.presion = this.form.value.presion;
      this.medicion.temperatura = this.form.value.temperatura;
      this.medicion.fechamedicion = this.form.value.fechamedicion;

      // FK: enviamos el id del hijo seleccionado
      this.medicion.idHijo = this.form.value.hijo;

      this.medicionService.insert(this.medicion).subscribe(() => {
        this.router.navigate(['/app/mediciones/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/mediciones/listar']);
  }
}
