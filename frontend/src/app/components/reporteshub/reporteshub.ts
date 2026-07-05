import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Loginservice } from '../../services/loginservice';

interface ReporteLink {
  titulo: string;
  icono: string;
  ruta: string;
}

interface EntidadReportes {
  entidad: string;
  icono: string;
  roles?: string[]; // sin roles = visible para todos los logueados
  reportes: ReporteLink[];
}

@Component({
  selector: 'app-reporteshub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './reporteshub.html',
  styleUrl: './reporteshub.css',
})
export class Reporteshub {
  private loginService = inject(Loginservice);

  private readonly grupos: EntidadReportes[] = [
    {
      entidad: 'Consulta Virtual',
      icono: 'event_available',
      roles: ['ADMIN', 'DOCTOR'],
      reportes: [
        { titulo: 'Consultas por estado', icono: 'donut_large', ruta: '/app/reportes/consultas-por-estado' },
        { titulo: 'Prioridad por estado y paciente', icono: 'filter_alt', ruta: '/app/consultas-virtuales/reporte-decidir-prioridad' },
      ],
    },
    {
      entidad: 'Distrito',
      icono: 'location_city',
      roles: ['ADMIN', 'DOCTOR'],
      reportes: [
        { titulo: 'Zonas de riesgo', icono: 'pie_chart', ruta: '/app/district/reporte-zonas-riesgo' },
        { titulo: 'Prioridad por ubigeo', icono: 'bar_chart', ruta: '/app/district/reporte-prioridad-ubigeo' },
        { titulo: 'Filtrar por departamento', icono: 'filter_alt', ruta: '/app/district/reporte-filtrar-departamento' },
        { titulo: 'Buscar por nombre', icono: 'search', ruta: '/app/district/reporte-buscar-nombre' },
      ],
    },
    {
      entidad: 'Limitación Física',
      icono: 'accessibility',
      reportes: [
        { titulo: 'Limitaciones por categoría', icono: 'pie_chart', ruta: '/app/limitacion-fisica/reporte-conteo-categoria' },
        { titulo: 'Filtrar por intensidad', icono: 'filter_alt', ruta: '/app/limitacion-fisica/reporte-filtrar-intensidad' },
        { titulo: 'Filtrar por categoría', icono: 'filter_alt', ruta: '/app/limitacion-fisica/reporte-filtrar-categoria' },
      ],
    },
    {
      entidad: 'Contenido Educativo',
      icono: 'menu_book',
      reportes: [
        { titulo: 'Contenidos por tipo', icono: 'pie_chart', ruta: '/app/contenido-educativo/reporte-conteo-tipo' },
        { titulo: 'Filtrar por tipo', icono: 'filter_alt', ruta: '/app/contenido-educativo/reporte-filtrar-tipo' },
      ],
    },
    {
      entidad: 'Ejercicio Recomendado',
      icono: 'fitness_center',
      reportes: [
        { titulo: 'Ejercicios por dificultad', icono: 'bar_chart', ruta: '/app/ejercicio-recomendado/reporte-conteo-dificultad' },
        { titulo: 'Filtrar por duración', icono: 'filter_alt', ruta: '/app/ejercicio-recomendado/reporte-filtrar-duracion' },
        { titulo: 'Buscar por nombre', icono: 'search', ruta: '/app/ejercicio-recomendado/reporte-buscar-nombre' },
      ],
    },
    {
      entidad: 'Especialidad',
      icono: 'medical_services',
      reportes: [
        { titulo: 'Buscar por área', icono: 'search', ruta: '/app/specialties/reporte-buscar-area' },
        { titulo: 'Atención virtual', icono: 'videocam', ruta: '/app/specialties/reporte-atencion-virtual' },
      ],
    },
    {
      entidad: 'Tipo Contenido',
      icono: 'category',
      reportes: [
        { titulo: 'Contenido rápido', icono: 'timer', ruta: '/app/tipos-contenido/reporte-contenido-rapido' },
      ],
    },
    {
      // Reportes clinicos agregados (todas las mediciones): solo doctor y admin
      entidad: 'Medición',
      icono: 'monitor_weight',
      roles: ['ADMIN', 'DOCTOR'],
      reportes: [
        { titulo: 'Prioridad por IMC', icono: 'bar_chart', ruta: '/app/mediciones/reporte-prioridad-imc' },
        { titulo: 'Signos vitales', icono: 'pie_chart', ruta: '/app/mediciones/reporte-signos-vitales' },
        { titulo: 'Riesgo nutricional', icono: 'pie_chart', ruta: '/app/mediciones/reporte-riesgo-nutricional' },
      ],
    },
    {
      // El padre puede ver el progreso de SUS hijos (el backend valida la propiedad)
      entidad: 'Progreso del niño',
      icono: 'child_care',
      reportes: [
        { titulo: 'Mediciones por hijo', icono: 'filter_alt', ruta: '/app/mediciones/reporte-filtrar-usuario' },
      ],
    },
    {
      entidad: 'Perfil Profesional',
      icono: 'badge',
      reportes: [
        { titulo: 'Perfiles por especialidad', icono: 'pie_chart', ruta: '/app/reportes/perfiles-por-especialidad' },
      ],
    },
    {
      entidad: 'Tipo Alerta',
      icono: 'warning',
      roles: ['ADMIN', 'DOCTOR'],
      reportes: [
        { titulo: 'Alertas por nivel de riesgo', icono: 'bar_chart', ruta: '/app/reportes/alertas-por-nivelriesgo' },
        { titulo: 'Filtrar por nivel de riesgo', icono: 'filter_alt', ruta: '/app/tipos-alerta/reporte-filtrar-nivelriesgo' },
      ],
    },
    {
      // Los endpoints de estos reportes son solo DOCTOR/ADMIN en el backend
      entidad: 'Alertas',
      icono: 'notifications_active',
      roles: ['ADMIN', 'DOCTOR'],
      reportes: [
        { titulo: 'Alertas por estado', icono: 'donut_large', ruta: '/app/alertas/reporte-conteo-estado' },
        { titulo: 'Filtrar alertas críticas', icono: 'filter_alt', ruta: '/app/alertas/reporte-filtrar-criticas' },
      ],
    },
    {
      entidad: 'Usuarios',
      icono: 'group',
      roles: ['ADMIN'],
      reportes: [
        { titulo: 'Usuarios por rol', icono: 'bar_chart', ruta: '/app/reportes/usuarios-por-rol' },
        { titulo: 'Usuarios por distrito', icono: 'show_chart', ruta: '/app/reportes/usuarios-por-distrito' },
      ],
    },
  ];

  // Solo se muestran las entidades permitidas para el rol de la sesion.
  readonly gruposVisibles: EntidadReportes[] = this.grupos.filter((g) => {
    if (!g.roles) {
      return true;
    }
    const rol = this.loginService.showRole();
    return rol !== null && g.roles.includes(rol);
  });
}
