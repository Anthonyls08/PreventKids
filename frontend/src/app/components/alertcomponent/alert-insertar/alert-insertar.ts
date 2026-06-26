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

      this.alerta.generationdate = this.form.value.generationdate;
      this.alerta.leida = this.form.value.leida;

      this.alerta.tipoalert.idTipoalerta = this.form.value.tipoalert;
      this.alerta.medicion.idMedicion = this.form.value.medicion;

      this.alertService.insert(this.alerta).subscribe(() => {
        this.router.navigate(['/app/alertas/listar']);
      });

    }

  }

  cancelar() {
    this.router.navigate(['/app/alertas/listar']);
  }

}