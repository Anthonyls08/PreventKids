import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
  selector: 'app-consultavirtual-actualizar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './consultavirtual-actualizar.html',
  styleUrl: './consultavirtual-actualizar.css',
})
export class ConsultaVirtualActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  consulta: VirtualConsultation = new VirtualConsultation();
  id: number = 0;

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
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      fechacita: ['', Validators.required],
      estado: ['', Validators.required],
      urlsala: ['', Validators.required],
      proveedor: ['', Validators.required],
      // FK obligatorias: no se puede guardar una consulta sin ellas.
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

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.consulta.idVirtualConsultation = this.form.value.codigo;
      this.consulta.fechacita = this.form.value.fechacita;
      this.consulta.estado = this.form.value.estado;
      this.consulta.urlsala = this.form.value.urlsala;
      this.consulta.proveedor = this.form.value.proveedor;
      this.consulta.idUser = this.form.value.idUser;
      this.consulta.idProfessionalProfile = this.form.value.idProfessionalProfile;

      this.vS.update(this.consulta).subscribe({
        next: () => {
          this.router.navigate(['/app/consultas-virtuales/listar']);
        },
        error: (e) => {
          console.error('Error al actualizar la consulta virtual', e);
        },
      });
    }
  }

  init() {
    this.vS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idVirtualConsultation,
        // datetime-local espera 'YYYY-MM-DDTHH:mm'; recortamos los segundos.
        fechacita: (data.fechacita ?? '').substring(0, 16),
        estado: data.estado,
        urlsala: data.urlsala,
        proveedor: data.proveedor,
        idUser: data.idUser,
        idProfessionalProfile: data.idProfessionalProfile,
      });
    });
  }
}
