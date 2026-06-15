import { Component, OnInit } from '@angular/core';
import { Districtservice } from '../../../services/districtservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { District } from '../../../models/district';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ditrict-actualizar',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './ditrict-actualizar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './ditrict-actualizar.css',
})
export class DitrictActualizar implements OnInit{
eliminar(arg0: any) {
throw new Error('Method not implemented.');
}
  form: FormGroup = new FormGroup({});
  aut: District = new District();
  id:number=0
dataSource = new MatTableDataSource<any>([]);
displayedColumns: any;


  constructor(
    private dS: Districtservice,
    private router:Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute // 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = params["id"]//
      this.init()
    })
  

    this.form = this.formBuilder.group({
      codigo:[""],//
     nombreDistrito: ['', Validators.required],
     nombreDepartamento: ['', Validators.required],
      zona: ['', Validators.required],
     ubigeo: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aut.idDistrict=this.form.value.codigo,
      this.aut.nameDistrict=this.form.value.nombreDistrito,
      this.aut.nameDepartment=this.form.value.nombreDepartamento,
      this.aut.zone=this.form.value.zona,
      this.aut.ubigeo=this.form.value.ubigeo,
      this.dS.update(this.aut).subscribe({
        next: () => {
          this.router.navigate(['/distrito/listar']);
        },
      });
    }
  }

 init(){
    this.dS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        codigo:data.idDistrict,
        nombreDistrito:data.nameDistrict,
        nombreDepartamento:data.nameDepartment,
        ubigeo:data.ubigeo,
        zona:data.zone,
      })
    })
  }
}
