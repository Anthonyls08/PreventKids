import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Loginservice } from '../../services/loginservice';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';

@Component({
  selector: 'app-authenticate',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Authenticate {
  private fb = inject(FormBuilder);
  private loginService = inject(Loginservice);
  private router = inject(Router);

  readonly cargando = signal<boolean>(false);
  readonly error = signal<string>('');

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.error.set('');

    const { email, password } = this.form.getRawValue();
    // El backend de PreventKids inicia sesión por email: viaja en el campo username.
    const request = new JwtRequestDTO();
    request.username = email!;
    request.password = password!;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.cargando.set(false);
        this.router.navigate(['/app']);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Correo o contrasena incorrectos. Intenta nuevamente.');
      },
    });
  }
}
