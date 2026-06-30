import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationalContent } from '../../../models/EducationalContent';
import { Educationalcontentservice } from '../../../services/educationalcontentservice';
import { TipoContenido } from '../../../models/TipoContenido';
import { Tipocontenidoservice } from '../../../services/tipocontenidoservice';
import { ProfessionalProfile } from '../../../models/ProfessionalProfile';
import { Professionalprofileservice } from '../../../services/professionalprofileservice';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-educational-content-insertar',
  imports: [MatInputModule, MatButtonModule, MatSelectModule, RouterLink, ReactiveFormsModule],
  templateUrl: './educational-content-insertar.html',
  styleUrl: './educational-content-insertar.css',
})
export class EducationalContentInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  contenido: EducationalContent = new EducationalContent();
  tiposContenido = signal<TipoContenido[]>([]);
  perfiles = signal<ProfessionalProfile[]>([]);

  constructor(
    private eS: Educationalcontentservice,
    private tcS: Tipocontenidoservice,
    private ppS: Professionalprofileservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tittleEducationalContent: ['', Validators.required],
      descriptionEC: ['', Validators.required],
      urlContent: ['', Validators.required],
      typeEC: ['', Validators.required],
      idProfessionalProfile: ['', Validators.required],
      idTipocontenido: ['', Validators.required],
    });

    this.tcS.list().subscribe((data) => {
      this.tiposContenido.set(data);
    });
    this.ppS.list().subscribe((data) => {
      this.perfiles.set(data);
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.contenido.tittleEducationalContent = this.form.value.tittleEducationalContent;
      this.contenido.descriptionEC = this.form.value.descriptionEC;
      this.contenido.urlContent = this.form.value.urlContent;
      this.contenido.typeEC = this.form.value.typeEC;
      this.contenido.idProfessionalProfile = this.form.value.idProfessionalProfile;
      this.contenido.idTipocontenido = this.form.value.idTipocontenido;
      this.eS.insert(this.contenido).subscribe({
        next: () => {
          this.router.navigate(['/app/contenido-educativo/listar']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
