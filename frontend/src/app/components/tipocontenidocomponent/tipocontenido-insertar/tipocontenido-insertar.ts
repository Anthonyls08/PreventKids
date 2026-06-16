import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TipoContenido } from '../../../models/TipoContenido';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';

@Component({
  selector: 'app-tipocontenido-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tipocontenido-insertar.html',
  styleUrl: './tipocontenido-insertar.css',
})
export class TipocontenidoInsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  tipoContenido: TipoContenido = new TipoContenido();

  constructor(
    private tcS: Tipocontenidoservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
    });
  }
  aceptar() {
  alert("Entré a aceptar");

  if (this.form.valid) {
    alert('Formulario válido');

    this.tipoContenido.nombre = this.form.value.nombre;
    this.tipoContenido.descripcion = this.form.value.descripcion;
    this.tipoContenido.duracion = this.form.value.duracion;

    this.tcS.insert(this.tipoContenido).subscribe({
      next: () => {
        alert('Registrado');
        this.router.navigate(['/app/tipos-contenido/listar']);
      },
      error: (err) => {
        console.log(err);
        alert('Error');
      }
    });
  }
}
}
