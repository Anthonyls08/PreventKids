import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homecomponent',
  imports: [RouterLink, MatIconModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Homecomponent {
  readonly destacados = [
    {
      icono: 'restaurant',
      titulo: 'Control de dieta',
      texto: 'Busca alimentos y controla calorías y azúcar de tu día.',
      link: '/app/dieta',
      color: '#2e7d32',
    },
    {
      icono: 'fitness_center',
      titulo: 'Actividad física',
      texto: 'Ejercicios recomendados para mantener activos a los niños.',
      link: '/app/ejercicios',
      color: '#ff8f00',
    },
    {
      icono: 'smart_display',
      titulo: 'Videos educativos',
      texto: 'Contenido sobre obesidad, nutrición y hábitos saludables.',
      link: '/app/videos',
      color: '#e53935',
    },
    {
      icono: 'video_camera_front',
      titulo: 'Videollamada',
      texto: 'Consulta en línea con un especialista de la salud.',
      link: '/app/videollamada',
      color: '#00897b',
    },
  ];

  readonly accesos = [
    {
      icono: 'warning',
      titulo: 'Tipos de alerta',
      texto: 'Gestiona las categorias de alertas de salud.',
      link: '/app/tipos-alerta/listar',
      color: '#e53935',
    },
    {
      icono: 'smart_toy',
      titulo: 'Chat IA',
      texto: 'Preguntas y respuestas del asistente inteligente.',
      link: '/app/chatia/listar',
      color: '#8e24aa',
    },
    {
      icono: 'location_city',
      titulo: 'Distritos',
      texto: 'Administra los distritos y zonas registradas.',
      link: '/app/district/listar',
      color: '#1565c0',
    },
    {
      icono: 'medical_services',
      titulo: 'Especialidades',
      texto: 'Especialidades de los profesionales de salud.',
      link: '/app/specialties/listar',
      color: '#00897b',
    },
    {
      icono: 'manage_accounts',
      titulo: 'Roles',
      texto: 'Controla los roles y permisos del sistema.',
      link: '/app/roles/listar',
      color: '#f57c00',
    },
    {
      icono: 'movie',
      titulo: 'Tipos de contenido',
      texto: 'Clasifica el contenido educativo disponible.',
      link: '/app/tipos-contenido/listar',
      color: '#3949ab',
    },
    {
      icono: 'accessibility_new',
      titulo: 'Limitacion fisica',
      texto: 'Registra limitaciones fisicas y ejercicios a evitar.',
      link: '/app/limitacion-fisica/listar',
      color: '#6d4c41',
    },
    {
      icono: 'notifications_active',
      titulo: 'Alertas',
      texto: 'Gestiona las alertas generadas por el sistema.',
      link: '/app/alertas/listar',
      color: '#d32f2f',
    },
  ];
}
