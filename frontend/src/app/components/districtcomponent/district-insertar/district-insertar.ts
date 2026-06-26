import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { District } from '../../../models/district';
import { Districtservice } from '../../../services/districtservice';
import { DEPARTAMENTOS, ZONAS, DepartamentoInfo, DistritoInfo } from '../../../data/ubigeo-lima-callao';

@Component({
  selector: 'app-district-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './district-insertar.html',
  styleUrl: './district-insertar.css',
})
export class DistrictInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  district: District = new District();

  departamentos: DepartamentoInfo[] = DEPARTAMENTOS;
  distritosFiltrados: DistritoInfo[] = [];
  zonas: string[] = ZONAS;

  constructor(
    private dS: Districtservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameDepartment: ['', Validators.required],
      nameDistrict: ['', Validators.required],
      zone: ['', Validators.required],
      // Validación: Solo números enteros de exactamente 6 dígitos
      ubigeo: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  // Al cambiar el departamento, se filtran los distritos y se limpian los
  // campos dependientes (distrito, zona y ubigeo).
  onDepartamentoChange(): void {
    const dep = this.departamentos.find(
      (d) => d.nombre === this.form.value.nameDepartment
    );
    this.distritosFiltrados = dep ? dep.distritos : [];
    this.form.patchValue({ nameDistrict: '', zone: '', ubigeo: '' });
  }

  // Al elegir el distrito se autocompletan su zona y su ubigeo.
  onDistritoChange(): void {
    const dist = this.distritosFiltrados.find(
      (d) => d.nombre === this.form.value.nameDistrict
    );
    if (dist) {
      this.form.patchValue({ zone: dist.zona, ubigeo: dist.ubigeo });
    }
  }

  aceptar() {
    if (this.form.valid) {
      this.district.nameDistrict = this.form.value.nameDistrict;
      this.district.nameDepartment = this.form.value.nameDepartment;
      this.district.zone = this.form.value.zone;
      this.district.ubigeo = this.form.value.ubigeo;

      this.dS.insert(this.district).subscribe({
        next: () => {
          this.router.navigate(['/app/district/listar']);
        }
      });
    }
  }
}
