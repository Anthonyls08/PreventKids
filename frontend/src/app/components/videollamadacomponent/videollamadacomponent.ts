import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videollamadacomponent',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './videollamadacomponent.html',
  styleUrl: './videollamadacomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Videollamadacomponent {
  private sanitizer = inject(DomSanitizer);

  sala = signal<string>('PreventKids-Consulta');
  enLlamada = signal<boolean>(false);

  urlSala = computed<SafeResourceUrl>(() => {
    const nombre = encodeURIComponent(this.sala().trim() || 'PreventKids-Consulta');
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://meet.jit.si/${nombre}#config.prejoinPageEnabled=false`
    );
  });

  iniciar() {
    if (this.sala().trim().length === 0) {
      return;
    }
    this.enLlamada.set(true);
  }

  salir() {
    this.enLlamada.set(false);
  }
}
