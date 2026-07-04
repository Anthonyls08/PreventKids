import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Userservice } from '../../services/userservice';
import { Roleservice } from '../../services/roleservice';
import { Districtservice } from '../../services/districtservice';
import { District } from '../../models/district';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(Userservice);
  private roleService = inject(Roleservice);
  private districtService = inject(Districtservice);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  readonly distritos = signal<District[]>([]);
  readonly cargando = signal<boolean>(false);
  readonly error = signal<string>('');
  readonly generos = ['Masculino', 'Femenino', 'Otro'];

  readonly form = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    genero: ['', [Validators.required]],
    fechanacimiento: ['', [Validators.required]],
    telefono: [0, [Validators.required]],
    idRole: [0, [Validators.required, Validators.min(1)]],
    idDistrict: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    // Evitamos llamar al backend durante el prerender SSR.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // El registro público siempre crea cuentas PADRE: los niños los registra
    // el padre dentro de la app y los doctores/admins los crea el administrador.
    this.roleService.list().subscribe({
      next: (data) => {
        const padre = data.find((r) => r.nombre?.toUpperCase() === 'PADRE');
        if (padre) {
          this.form.patchValue({ idRole: padre.idRole });
        }
      },
    });
    this.districtService.list().subscribe({
      next: (data) => this.distritos.set(data),
    });
  }

  registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.error.set('');

    const v = this.form.getRawValue();
    const u = new User();
    u.nombre = v.nombre!;
    u.apellido = v.apellido!;
    u.email = v.email!;
    u.password = v.password!;
    u.genero = v.genero!;
    u.fechanacimiento = v.fechanacimiento!;
    u.telefono = Number(v.telefono);
    u.idRole = Number(v.idRole);
    u.idDistrict = Number(v.idDistrict);
    u.estado = true;

    this.userService.insert(u).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set(
          'No se pudo completar el registro. Verifica los datos e intenta nuevamente.'
        );
      },
    });
  }
}
