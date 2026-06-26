import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessionalProfile } from '../../../models/ProfessionalProfile';
import { Professionalprofileservice } from '../../../services/professionalprofileservice';
import { User } from '../../../models/User';
import { Userservice } from '../../../services/userservice';
import { Specialty } from '../../../models/Specialty';
import { Specialtyservice } from '../../../services/specialtyservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-professional-profile-insertar',
  imports: [MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './professional-profile-insertar.html',
  styleUrl: './professional-profile-insertar.css',
})
export class ProfessionalProfileInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  perfil: ProfessionalProfile = new ProfessionalProfile();
  usuarios = signal<User[]>([]);
  especialidades = signal<Specialty[]>([]);

  constructor(
    private ppS: Professionalprofileservice,
    private uS: Userservice,
    private sS: Specialtyservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      numerocolegiatura: ['', Validators.required],
      institucion: ['', Validators.required],
      idUser: ['', Validators.required],
      idSpecialty: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.usuarios.set(data);
    });
    this.sS.list().subscribe((data) => {
      this.especialidades.set(data);
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.perfil.numerocolegiatura = this.form.value.numerocolegiatura;
      this.perfil.institucion = this.form.value.institucion;
      this.perfil.idUser = this.form.value.idUser;
      this.perfil.idSpecialty = this.form.value.idSpecialty;
      this.ppS.insert(this.perfil).subscribe({
        next: () => {
          this.router.navigate(['/app/perfil-profesional/listar']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
