import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
    RouterLink,
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

    // El formulario se crea ANTES de leer los parametros de la ruta,
    // para que el patchValue siempre encuentre los controles ya definidos.
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

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

  }

  init() {
    this.alertService.listId(this.id).subscribe(data => {
      // Acceso seguro (?.) a las FK: si el backend devuelve tipoalert o medicion
      // en null, el formulario se carga igual en lugar de romper el patchValue.
      this.form.patchValue({
        idAlert: data.idAlert,
        generationdate: data.generationdate,
        leida: data.leida,
        tipoalert: data.tipoalert?.idTipoalerta,
        medicion: data.medicion?.idMedicion,
      });
    });
  }

  aceptar() {

    if (this.form.valid) {

      // Enviamos SOLO los ids de las FK. Si mandamos el objeto medicion/usuario
      // completo, el backend falla (User.idRole/idDistrict son objetos, no números).
      const payload = {
        idAlert: this.form.value.idAlert,
        generationdate: this.form.value.generationdate,
        leida: this.form.value.leida,
        tipoalert: { idTipoalerta: this.form.value.tipoalert },
        medicion: { idMedicion: this.form.value.medicion },
      } as unknown as Alert;

      this.alertService.update(payload).subscribe({
        next: () => {
          this.router.navigate(['/app/alertas/listar']);
        },
        error: (err) => {
          console.error('Error al actualizar la alerta en el backend:', err);
        },
      });

    } else {
      // Si algo quedo sin cargar, marcamos los campos para mostrar el error
      // en lugar de que el boton "Actualizar" no haga nada en silencio.
      this.form.markAllAsTouched();
    }

  }

}