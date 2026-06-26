import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  selector: 'app-alert-actualizar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './alert-actualizar.html',
  styleUrl: './alert-actualizar.css',
})
export class AlertActualizar implements OnInit {

  form: FormGroup = new FormGroup({});
  alerta: Alert = new Alert();

  id: number = 0;

  listaTipos: TipoAlerta[] = [];
  listaMediciones: Medicion[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: Alertservice,
    private tipoService: Tipoalertaservice,
    private medicionService: Medicionservice
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.fb.group({
      idAlert: [''],
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

  init() {
    this.alertService.listId(this.id).subscribe(data => {
      this.form.patchValue({
        idAlert: data.idAlert,
        generationdate: data.generationdate,
        leida: data.leida,
        tipoalert: data.tipoalert.idTipoalerta,
        medicion: data.medicion.idMedicion,
      });
    });
  }

  aceptar() {

    if (this.form.valid) {

      this.alerta.idAlert = this.form.value.idAlert;
      this.alerta.generationdate = this.form.value.generationdate;
      this.alerta.leida = this.form.value.leida;

      this.alerta.tipoalert.idTipoalerta = this.form.value.tipoalert;
      this.alerta.medicion.idMedicion = this.form.value.medicion;

      this.alertService.update(this.alerta).subscribe(() => {
        this.router.navigate(['/app/alertas/listar']);
      });

    }

  }

}