import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { TipoContenido } from '../../../models/TipoContenido';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';

@Component({
  selector: 'app-tipocontenido-actualizar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tipocontenido-actualizar.html',
  styleUrl: './tipocontenido-actualizar.css',
})
export class TipocontenidoActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoContenido: TipoContenido = new TipoContenido();
  id: number = 0;

  tipos: string[] = ['VIDEO', 'PDF', 'AUDIO', 'INFOGRAFÍA', 'ARTÍCULO', 'PRESENTACIÓN', 'IMAGEN', 'ENLACE'];

  constructor(
    private tcS: Tipocontenidoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.tipoContenido.idTipocontenido = this.form.value.codigo;
      this.tipoContenido.nombre = this.form.value.nombre;
      this.tipoContenido.descripcion = this.form.value.descripcion;
      this.tipoContenido.duracion = this.form.value.duracion;
      this.tcS.update(this.tipoContenido).subscribe({
        next: () => {
          this.router.navigate(['/app/tipos-contenido/listar']);
        },
        error: (e) => {
          console.error('Error al actualizar el tipo de contenido', e);
        },
      });
    }
  }

  init() {
    this.tcS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idTipocontenido,
        nombre: data.nombre,
        descripcion: data.descripcion,
        duracion: data.duracion,
      });
    });
  }
}
