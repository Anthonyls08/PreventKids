import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TipoAlertaListar } from './tipo-alerta-listar/tipo-alerta-listar';

@Component({
  selector: 'app-tipoalertacomponent',
  imports: [RouterOutlet,TipoAlertaListar],
  templateUrl: './tipoalertacomponent.html',
  styleUrl: './tipoalertacomponent.css',
})
export class Tipoalertacomponent {

  constructor(public route:ActivatedRoute){}
}
