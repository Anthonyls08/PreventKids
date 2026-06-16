import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  readonly servicios = [
    {
      icono: 'monitor_heart',
      titulo: 'Monitoreo de salud',
      texto:
        'Registra mediciones de peso, talla e IMC y visualiza la evolucion de cada nino en el tiempo.',
    },
    {
      icono: 'fitness_center',
      titulo: 'Rutinas de ejercicio',
      texto:
        'Recomendaciones de actividad fisica en espanol, adaptadas a la edad y condicion de cada nino.',
    },
    {
      icono: 'restaurant',
      titulo: 'Guia nutricional',
      texto:
        'Consejos practicos de alimentacion saludable para combatir el sobrepeso desde casa.',
    },
    {
      icono: 'notifications_active',
      titulo: 'Alertas tempranas',
      texto:
        'Recibe avisos cuando un indicador de riesgo de obesidad necesita atencion.',
    },
    {
      icono: 'groups',
      titulo: 'Consulta profesional',
      texto:
        'Conecta con especialistas y agenda consultas virtuales para un seguimiento integral.',
    },
    {
      icono: 'smart_toy',
      titulo: 'Asistente Chat IA',
      texto:
        'Resuelve dudas frecuentes sobre prevencion y habitos saludables al instante.',
    },
  ];

  readonly pasos = [
    {
      numero: '1',
      titulo: 'Crea tu cuenta',
      texto: 'Registrate en segundos como familia o profesional de la salud.',
    },
    {
      numero: '2',
      titulo: 'Registra los datos',
      texto: 'Ingresa mediciones y la informacion de cada nino a monitorear.',
    },
    {
      numero: '3',
      titulo: 'Recibe recomendaciones',
      texto: 'Obten ejercicios y consejos personalizados de forma continua.',
    },
    {
      numero: '4',
      titulo: 'Da seguimiento',
      texto: 'Observa el progreso y previene la obesidad a tiempo.',
    },
  ];

  readonly estadisticas = [
    { valor: '1 de 3', etiqueta: 'ninos en la region tiene sobrepeso' },
    { valor: '60 min', etiqueta: 'de actividad fisica diaria recomendada' },
    { valor: '+850', etiqueta: 'ejercicios disponibles en espanol' },
    { valor: '24/7', etiqueta: 'recomendaciones siempre disponibles' },
  ];

  readonly testimonios = [
    {
      inicial: 'M',
      nombre: 'Maria Quispe',
      rol: 'Madre de familia',
      texto:
        'Gracias a PreventKids mi hijo se mueve mas y come mejor. Las recomendaciones diarias nos motivan en familia.',
    },
    {
      inicial: 'C',
      nombre: 'Dr. Carlos Rojas',
      rol: 'Nutricionista pediatrico',
      texto:
        'Es una herramienta excelente para dar seguimiento a mis pacientes y detectar riesgos a tiempo.',
    },
    {
      inicial: 'L',
      nombre: 'Lucia Fernandez',
      rol: 'Docente de inicial',
      texto:
        'La uso con los padres de mis alumnos. Es simple, en espanol y realmente ayuda a crear buenos habitos.',
    },
  ];
}
