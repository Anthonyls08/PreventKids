import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhysicalLimitation } from '../../../models/physical-limitation';
import { PhysicalLimitationService } from '../../../services/limitacionfisicaservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-physical-limitation-insertar',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './physical-limitation-insertar.html',
  styleUrl: './physical-limitation-insertar.css',
})
export class PhysicalLimitationInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  limitacion: PhysicalLimitation = new PhysicalLimitation();

  constructor(
    private pS: PhysicalLimitationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      ejerciciosProhibidos: ['', Validators.required],
      intensidad: ['', Validators.required]
    });
  }

  aceptar() {
    console.log("Formulario enviado:", this.form.value); // <--- Agrega esto
    
    if (this.form.valid) {
      console.log("Formulario válido, enviando datos..."); // <--- Agrega esto
      
      this.limitacion.nameLimitation = this.form.value.nombre;
      this.limitacion.descriptionLimitation = this.form.value.descripcion;
      // ... (resto de tus campos)
      
      this.pS.insert(this.limitacion).subscribe({
        next: () => {
          console.log("Registro exitoso, navegando..."); // <--- Agrega esto
          this.router.navigate(['/limitacion-fisica/listar']);
        },
        error: (err) => {
          console.error("Error al registrar:", err); // <--- Esto te dirá si falla el servidor
        }
      });
    } else {
      console.log("Formulario inválido"); // <--- Si ves esto, es que faltan campos requeridos
    }
  }
}