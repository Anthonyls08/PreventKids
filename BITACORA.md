# 📒 Bitácora del Proyecto — PreventKids

> Aplicación web para el **control y prevención de la obesidad infantil**.
> Registro del desarrollo del backend (API REST) y el frontend (Angular).

---

## 1. Información general

| Campo | Detalle |
|---|---|
| **Proyecto** | PreventKids — prevención de la obesidad infantil |
| **Curso** | Arquitectura de Aplicaciones Web |
| **Repositorio** | https://github.com/dazps/PreventKids |
| **Tablero Trello** | https://trello.com/b/VTjDKYZX/prevenkids |
| **Integrantes** | Dalí Paredes, Anthony Lara, Denzel Castillo, Rodrigo Ashcallay, Saul Contreras |
| **Fecha de esta entrega** | 16/06/2026 |

> *Nota: ajustar el nombre del curso según corresponda.*

---

## 2. Descripción

PreventKids es una plataforma que ayuda a familias y profesionales de la salud a
**monitorear, prevenir y combatir el sobrepeso en niños y adolescentes**. Permite
gestionar catálogos (distritos, especialidades, tipos de alerta, etc.), controlar la
dieta y la actividad física, ver contenido educativo y realizar consultas por
videollamada, integrando **APIs externas reales**.

---

## 3. Tecnologías utilizadas

**Backend**
- Spring Boot 4.0.5, Java 21
- PostgreSQL + Spring Data JPA
- Spring Security + JWT (login con token)
- ModelMapper, SpringDoc OpenAPI (Swagger)

**Frontend**
- Angular 21 (standalone components, signals, control flow `@if`/`@for`)
- Angular Material
- Formularios reactivos
- APIs externas: Open Food Facts, wger, YouTube (IFrame), Jitsi Meet

---

## 4. Bitácora de actividades

| Fase | Actividad | Detalle | Estado |
|---|---|---|---|
| Sprint 1 (Backend) | Modelado y CRUD | Entidades, DTOs, repositorios, servicios y controllers por capas | ✅ |
| Sprint 1 (Backend) | Seguridad JWT | Login, filtro JWT, BCrypt, roles | ✅ |
| Sprint 2 (Backend) | Búsquedas y filtros | `buscarPorNombre`, `buscarPorCategoria`, `findByArea`, `buscarPorAtencionVirtual` | ✅ |
| Sprint 2 (Backend) | CORS | `CorsConfig`, `cors()` en `WebSecurityConfig`, `@CrossOrigin` en login | ✅ |
| Sprint 3 (Frontend) | CRUD de entidades independientes | Listar / Insertar / Actualizar / Eliminar de 7 entidades | ✅ |
| Sprint 3 (Frontend) | Autenticación | Login y registro con JWT, guard de rutas | ✅ |
| Sprint 3 (Frontend) | Módulos con APIs externas | Dieta, Ejercicios, Videos, Videollamada | ✅ |
| Sprint 3 (Frontend) | Identidad visual | Tema verde salud + turquesa, landing, navegación | ✅ |
| Sprint 3 (Frontend) | Documentación | Tablero Trello con 36 historias de usuario (HU66–HU101) | ✅ |

---

## 5. Cumplimiento de criterios

| Criterio | Evidencia | Estado |
|---|---|---|
| CRUD de entidades independientes | 7 entidades (TipoAlerta, ChatIA, District, PhysicalLimitation, Role, Specialty, TipoContenido) con CRUD completo en backend y frontend | ✅ |
| Uso de API externa | Open Food Facts (dieta), wger (ejercicios), YouTube (videos), Jitsi (videollamada) | ✅ |
| Validaciones | Backend: validaciones con mensajes en español. Frontend: `Validators.required` / `Validators.email` | ✅ |
| Filtros simples / búsquedas | `buscarPorNombre`, `buscarPorCategoria`, `findByArea`, búsqueda de alimentos en Dieta | ✅ |
| Configuración CORS | `CorsConfig.java` + `WebSecurityConfig` | ✅ |
| Trello / bitácora del frontend | 36 historias de usuario con tareas, criterios de aceptación y prioridad | ✅ |
| Liberar rutas en WebSecurityConfig | 7 entidades independientes + login + swagger liberadas con `permitAll()` | ✅ |

---

## 6. Problemas encontrados y soluciones

| # | Problema | Solución |
|---|---|---|
| 1 | En el componente *actualizar* los datos no se cargaban y usaba `insert()` en vez de `update()` | Se reordenó el `ngOnInit`, se llamó a `init()` con `patchValue` y se corrigió a `update()` |
| 2 | El endpoint de actualizar de TipoContenido (`PUT /{id}`) no era uniforme con el resto | Se evaluó; se dejó funcional y se documentó el porqué |
| 3 | La barra de menú se desbordaba con muchos botones | Se agruparon las 7 entidades en un menú "Gestión" y se rediseñó la navegación |
| 4 | Los enlaces nuevos del menú salían de otro color (no blanco) | Se ajustó la regla CSS para incluir las etiquetas `<a>` |
| 5 | El formulario de login "saltaba" al mostrar errores | Animación suave del mensaje y espaciado uniforme |
| 6 | Colores rojos residuales tras cambiar el tema a verde | Reemplazo global de los colores rojos por verde/turquesa |
| 7 | Acentos rotos al crear tarjetas en Trello (Latin-1 de Git Bash) | Envío de los datos como JSON con los acentos escapados a ASCII |
| 8 | `alert()` de depuración que aparecían en la demo | Se eliminaron del código del frontend |

---

## 7. APIs externas integradas

| Módulo | API | Uso |
|---|---|---|
| Dieta | **Open Food Facts** | Buscar alimentos y ver calorías, azúcar y Nutri-Score |
| Actividad física | **wger** | Lista de ejercicios recomendados |
| Videos | **YouTube (IFrame)** | Videos educativos sobre quemar grasa y hábitos saludables |
| Videollamada | **Jitsi Meet** | Consulta en línea con un especialista |

Todas son públicas y **no requieren API key**.

---

## 8. Pendientes y recomendaciones

- [ ] Decidir si las entidades **relacionales** (`/alerta`, `/api/medicion`, `/virtualconsultations`, etc.) se liberan en `WebSecurityConfig` o se mantienen protegidas con JWT.
- [ ] Al **desplegar**, mover `jwt.secret` y la contraseña de la base de datos a variables de entorno.
- [ ] Confirmar/actualizar los IDs de videos de YouTube y las imágenes del landing.
- [ ] Regenerar el token y el API Secret de Trello (quedaron expuestos durante el desarrollo).

---

## 9. Evidencias

- **Código:** repositorio en GitHub (rama `dali-paredes`).
- **Documentación ágil:** tablero Trello con Product Backlog, Sprint 2 y lista *frontend* (HU66–HU101).
- **Documentación de API:** Swagger UI en `/swagger-ui.html`.
