import { Component, OnInit } from '@angular/core';
import { Districtservice } from '../../../services/districtservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { District } from '../../../models/district';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DEPARTAMENTOS, ZONAS, DepartamentoInfo, DistritoInfo } from '../../../data/ubigeo-lima-callao';

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

  departamentos: DepartamentoInfo[] = DEPARTAMENTOS;
  distritosFiltrados: DistritoInfo[] = [];
  zonas: string[] = ZONAS;

  constructor(
    private dS: Districtservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }],
      nombreDistrito: ['', Validators.required],
      nombreDepartamento: ['', Validators.required],
      zona: ['', Validators.required],
      // Validación: Exactamente 6 dígitos numéricos
      ubigeo: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  // Filtra los distritos del departamento seleccionado a partir de su nombre.
  private filtrarDistritos(nombreDepartamento: string): void {
    const dep = this.departamentos.find((d) => d.nombre === nombreDepartamento);
    this.distritosFiltrados = dep ? dep.distritos : [];
  }

  // Al cambiar el departamento, se filtran los distritos y se limpian los
  // campos dependientes (distrito, zona y ubigeo).
  onDepartamentoChange(): void {
    this.filtrarDistritos(this.form.value.nombreDepartamento);
    this.form.patchValue({ nombreDistrito: '', zona: '', ubigeo: '' });
  }

  // Al elegir el distrito se autocompletan su zona y su ubigeo.
  onDistritoChange(): void {
    const dist = this.distritosFiltrados.find(
      (d) => d.nombre === this.form.value.nombreDistrito
    );
    if (dist) {
      this.form.patchValue({ zona: dist.zona, ubigeo: dist.ubigeo });
    }
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
      // Cargamos los distritos del departamento guardado para que el select
      // muestre las opciones correctas.
      this.filtrarDistritos(data.nameDepartment);
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
