import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Alert } from '../../../models/Alert';
import { TipoAlerta } from '../../../models/TipoAlerta';
import { Medicion } from '../../../models/Medicion';

import { Alertservice } from '../../../services/alertservice';
import { Tipoalertaservice } from '../../../services/tipoalertaservice';
import { Medicionservice } from '../../../services/medicionservice';

@Component({
  selector: 'app-alert-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './alert-insertar.html',
  styleUrl: './alert-insertar.css',
})
export class AlertInsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  alerta: Alert = new Alert();

  listaTipos: TipoAlerta[] = [];
  listaMediciones: Medicion[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: Alertservice,
    private tipoService: Tipoalertaservice,
    private medicionService: Medicionservice
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      generationdate: ['', Validators.required],
      leida: ['', Validators.required],
      tipoalert: ['', Validators.required],
      medicion: ['', Validators.required],
    });

    this.tipoService.list().subscribe(data => {
      this.listaTipos = data;
    });

    this.medicionService.list().subscribe(data => {
      this.listaMediciones = data;
    });

  }

  aceptar() {

    if (this.form.valid) {

      // Enviamos SOLO los ids de las FK (ver nota en alert-actualizar):
      // mandar el objeto medicion/usuario completo rompe la deserialización.
      const payload = {
        generationdate: this.form.value.generationdate,
        leida: this.form.value.leida,
        tipoalert: { idTipoalerta: this.form.value.tipoalert },
        medicion: { idMedicion: this.form.value.medicion },
      } as unknown as Alert;

      this.alertService.insert(payload).subscribe({
        next: () => {
          this.router.navigate(['/app/alertas/listar']);
        },
        error: (err) => {
          console.error('Error al registrar la alerta en el backend:', err);
        },
      });

    } else {
      this.form.markAllAsTouched();
    }

  }

  cancelar() {
    this.router.navigate(['/app/alertas/listar']);
  }

}