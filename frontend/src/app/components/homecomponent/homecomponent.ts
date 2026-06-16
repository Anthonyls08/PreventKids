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
  ];
}
