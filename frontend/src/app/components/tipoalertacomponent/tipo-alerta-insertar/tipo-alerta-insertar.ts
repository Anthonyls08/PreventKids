import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoAlerta } from '../../../models/TipoAlerta';
import { Tipoalertaservice } from '../../../services/tipoalertaservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tipo-alerta-insertar',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tipo-alerta-insertar.html',
  styleUrl: './tipo-alerta-insertar.css',
})
export class TipoAlertaInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  tipo: TipoAlerta = new TipoAlerta();
  niveles: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
  ];
  opcionesAtencion: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Sí' },
    { value: false, viewValue: 'No' },
  ];

  constructor(
    private tS: Tipoalertaservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      nivelriesgo: ['', Validators.required],
      descripcion: ['', Validators.required],
      atencionprof: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.tipo.nombre = this.form.value.nombre;
      this.tipo.nivelriesgo = this.form.value.nivelriesgo;
      this.tipo.descripcion = this.form.value.descripcion;
      this.tipo.atencionprof = this.form.value.atencionprof;
      this.tipo.mensaje = this.form.value.mensaje;
      this.tS.insert(this.tipo).subscribe({
        next: () => {
          this.router.navigate(['/tipos-alerta/listar']);
        },
      });
    }
  }
}
