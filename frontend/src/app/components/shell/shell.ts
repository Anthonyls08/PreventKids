import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';
import { Recomendaciones } from '../recomendaciones/recomendaciones';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Menucomponent, Recomendaciones],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
