import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { District } from '../../../models/district';
import { Districtservice } from '../../../services/districtservice';

@Component({
  selector: 'app-district-insertar',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './district-insertar.html',
  styleUrl: './district-insertar.css',
})
export class DistrictInsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  district: District = new District();

  constructor(
    private dS: Districtservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameDistrict: ['', Validators.required],
      nameDepartment: ['', Validators.required],
      zone: ['', Validators.required],
      ubigeo: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.district.nameDistrict = this.form.value.nameDistrict;
      this.district.nameDepartment = this.form.value.nameDepartment;
      this.district.zone = this.form.value.zone;
      this.district.ubigeo = this.form.value.ubigeo;
      this.dS.insert(this.district).subscribe({
        next: () => {
          this.router.navigate(['/app/district/listar'])
        }
      })
    }
  }
}
