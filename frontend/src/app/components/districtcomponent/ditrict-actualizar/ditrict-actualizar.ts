import { Component, OnInit } from '@angular/core';
import { Districtservice } from '../../../services/districtservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { District } from '../../../models/district';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ditrict-actualizar',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './ditrict-actualizar.html',
  styleUrl: './ditrict-actualizar.css',
})
export class DitrictActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  aut: District = new District();
  id: number = 0;

  zonas: string[] = ['Lima Centro', 'Lima Norte', 'Lima Sur', 'Lima Este', 'Callao', 'Provincia'];

  constructor(
    private dS: Districtservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }], 
      nombreDistrito: ['', Validators.required],
      nombreDepartamento: ['', Validators.required],
      zona: ['', Validators.required],
      // Validación: Exactamente 6 dígitos numéricos
      ubigeo: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  aceptar() {
    if (this.form.valid || (this.form.get('nombreDistrito')?.valid && 
                            this.form.get('nombreDepartamento')?.valid && 
                            this.form.get('zona')?.valid && 
                            this.form.get('ubigeo')?.valid)) {
      
      this.aut.idDistrict = this.id; // Forzamos el ID de la URL
      this.aut.nameDistrict = this.form.getRawValue().nombreDistrito;
      this.aut.nameDepartment = this.form.getRawValue().nombreDepartamento;
      this.aut.zone = this.form.getRawValue().zona;
      this.aut.ubigeo = this.form.getRawValue().ubigeo;

      this.dS.update(this.aut).subscribe({
        next: () => {
          this.router.navigate(['/app/district/listar']);
        },
        error: (err) => {
          console.error("Error al actualizar en el backend:", err);
        }
      });
    }
  }

  init() {
    this.dS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idDistrict,
        nombreDistrito: data.nameDistrict,
        nombreDepartamento: data.nameDepartment,
        ubigeo: data.ubigeo,
        zona: data.zone,
      });
    });
  }
}