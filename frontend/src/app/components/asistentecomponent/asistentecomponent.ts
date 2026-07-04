import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Chatiaservice } from '../../services/chatiaservice';

interface Mensaje {
  autor: 'usuario' | 'bot';
  texto: string;
  desdeCache: boolean;
}

@Component({
  selector: 'app-asistentecomponent',
  imports: [FormsModule, RouterLink, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './asistentecomponent.html',
  styleUrl: './asistentecomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Asistentecomponent {
  private cS = inject(Chatiaservice);
  private chatArea = viewChild<ElementRef<HTMLDivElement>>('chatArea');

  pregunta = signal<string>('');
  mensajes = signal<Mensaje[]>([]);
  escribiendo = signal<boolean>(false);

  sugeridas = [
    '¿Cuánta azúcar puede consumir un niño al día?',
    '¿Cuántas horas debe dormir un niño?',
    '¿Qué deporte es bueno para un niño de 8 años?',
    '¿Qué puedo poner en una lonchera saludable?',
  ];

  enviar(texto?: string) {
    const p = (texto ?? this.pregunta()).trim();
    if (p.length === 0 || this.escribiendo()) {
      return;
    }
    this.pregunta.set('');
    this.mensajes.update((lista) => [
      ...lista,
      { autor: 'usuario', texto: p, desdeCache: false },
    ]);
    this.escribiendo.set(true);
    this.bajarScroll();

    this.cS.preguntar(p).subscribe({
      next: (r) => this.mostrarRespuesta(r.respuesta, r.desdeCache),
      error: () =>
        this.mostrarRespuesta(
          'El asistente no está disponible en este momento. Te recomendamos consultar con un especialista desde el módulo de videollamada.',
          false
        ),
    });
  }

  // Muestra la respuesta del bot en varias burbujas (una por grupo de
  // oraciones), con el indicador de "escribiendo" entre cada una.
  // El input queda bloqueado (escribiendo=true) hasta la ultima burbuja.
  private mostrarRespuesta(texto: string, desdeCache: boolean) {
    const partes = this.partirEnMensajes(texto);
    const mostrar = (i: number) => {
      setTimeout(() => {
        const esUltima = i === partes.length - 1;
        this.mensajes.update((lista) => [
          ...lista,
          { autor: 'bot', texto: partes[i], desdeCache: desdeCache && esUltima },
        ]);
        this.bajarScroll();
        if (esUltima) {
          this.escribiendo.set(false);
        } else {
          mostrar(i + 1);
        }
      }, i === 0 ? 500 : 1000);
    };
    mostrar(0);
  }

  // Parte el texto por oraciones y las agrupa en mensajes de ~140 caracteres
  private partirEnMensajes(texto: string): string[] {
    const oraciones = texto.match(/[^.!?]+[.!?]*\s*/g) ?? [texto];
    const partes: string[] = [];
    let actual = '';
    for (const oracion of oraciones) {
      if (actual.length > 0 && (actual + oracion).length > 140) {
        partes.push(actual.trim());
        actual = oracion;
      } else {
        actual += oracion;
      }
    }
    if (actual.trim().length > 0) {
      partes.push(actual.trim());
    }
    return partes.length > 0 ? partes : [texto];
  }

  private bajarScroll() {
    setTimeout(() => {
      const area = this.chatArea()?.nativeElement;
      if (area) {
        area.scrollTop = area.scrollHeight;
      }
    }, 50);
  }
}
