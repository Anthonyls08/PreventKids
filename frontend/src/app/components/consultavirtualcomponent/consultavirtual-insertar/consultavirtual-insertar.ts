import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { VirtualConsultation } from '../../../models/VirtualConsultation';
import { Virtualconsultationservice } from '../../../services/virtualconsultationservice';
import { Userservice } from '../../../services/userservice';
import { User } from '../../../models/User';
import { Professionalprofileservice } from '../../../services/professionalprofileservice';
import { ProfessionalProfile } from '../../../models/ProfessionalProfile';

@Component({
  selector: 'app-consultavirtual-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './consultavirtual-insertar.html',
  styleUrl: './consultavirtual-insertar.css',
})
export class ConsultaVirtualInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  consulta: VirtualConsultation = new VirtualConsultation();

  // Datos para los selects de las FK.
  usuarios: User[] = [];
  perfiles: ProfessionalProfile[] = [];

  estados: string[] = ['Pendiente', 'Confirmada', 'En curso', 'Finalizada', 'Cancelada'];
  proveedores: string[] = [
    'Jitsi Meet',
    'Google Meet',
    'Zoom',
    'Microsoft Teams',
    'WhatsApp',
    'Skype',
    'Webex',
  ];

  constructor(
    private vS: Virtualconsultationservice,
    private uS: Userservice,
    private ppS: Professionalprofileservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechacita: ['', Validators.required],
      estado: ['', Validators.required],
      urlsala: ['', Validators.required],
      proveedor: ['', Validators.required],
      // FK obligatorias: no se puede registrar una consulta sin ellas.
      idUser: [0, [Validators.required, Validators.min(1)]],
      idProfessionalProfile: [0, [Validators.required, Validators.min(1)]],
    });

    this.uS.list().subscribe({
      // Solo pacientes (rol = 2) pueden ser asignados a una consulta.
      next: (data) => (this.usuarios = data.filter((u) => u.idRole === 2)),
      error: (e) => console.error('Error al cargar usuarios', e),
    });
    this.ppS.list().subscribe({
      next: (data) => (this.perfiles = data),
      error: (e) => console.error('Error al cargar perfiles profesionales', e),
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.consulta.fechacita = this.form.value.fechacita;
      this.consulta.estado = this.form.value.estado;
      this.consulta.urlsala = this.form.value.urlsala;
      this.consulta.proveedor = this.form.value.proveedor;
      this.consulta.idUser = this.form.value.idUser;
      this.consulta.idProfessionalProfile = this.form.value.idProfessionalProfile;

      this.vS.insert(this.consulta).subscribe({
        next: () => {
          this.router.navigate(['/app/consultas-virtuales/listar']);
        },
        error: (e) => {
          console.error('Error al registrar la consulta virtual', e);
        },
      });
    }
  }
}
