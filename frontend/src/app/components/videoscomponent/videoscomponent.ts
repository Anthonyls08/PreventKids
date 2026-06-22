import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  titulo: string;
  descripcion: string;
  youtubeId: string;
  fuente: string;
}

@Component({
  selector: 'app-videoscomponent',
  imports: [MatIconModule],
  templateUrl: './videoscomponent.html',
  styleUrl: './videoscomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Videoscomponent {
  private sanitizer = inject(DomSanitizer);

  // Videos reales del canal Metal Pump enfocados en quemar grasa.
  // Se reproducen con el reproductor embebido de YouTube (IFrame API).
  readonly videos: Video[] = [
    {
      titulo: 'Los 5 únicos ejercicios que necesitas para quemar grasa',
      descripcion:
        'Rutina simple y efectiva con los ejercicios clave para quemar grasa corporal.',
      youtubeId: 'RlpNeBfTxR8',
      fuente: 'Metal Pump',
    },
    {
      titulo: 'Esta rutina militar quema grasa a lo bestia',
      descripcion:
        'Entrenamiento de alta intensidad inspirado en rutinas militares para acelerar la quema de grasa.',
      youtubeId: 'Tm_SayddjBI',
      fuente: 'Metal Pump',
    },
    {
      titulo: 'Quema la grasa abdominal con 5 ejercicios (sin cardio)',
      descripcion:
        'Cinco ejercicios enfocados en reducir la grasa abdominal sin necesidad de cardio.',
      youtubeId: 'JtecYNrTt7I',
      fuente: 'Metal Pump',
    },
    {
      titulo: 'Cómo perder los flotadores rápido (sin dietas)',
      descripcion:
        'Estrategia de ejercicio para eliminar la grasa de la cintura de forma rápida.',
      youtubeId: 'en7s3UXS_p0',
      fuente: 'Metal Pump',
    },
    {
      titulo: 'La rutina de 14 días para lograr abdominales',
      descripcion:
        'Plan de dos semanas para marcar el abdomen combinando ejercicio y constancia.',
      youtubeId: '0Rufs2HuTGQ',
      fuente: 'Metal Pump',
    },
  ];

  seleccionado = signal<Video>(this.videos[0]);

  urlActual = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.seleccionado().youtubeId}`
    )
  );

  miniatura(id: string): string {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  seleccionar(v: Video) {
    this.seleccionado.set(v);
  }
}
