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
| **Fecha de esta entrega** | 05/07/2026 (despliegue en la nube) |
| **App en producción (frontend)** | Vercel — *(colocar aquí la URL `.vercel.app`)* |
| **API en producción (backend)** | https://preventkids.onrender.com — Swagger en `/swagger-ui.html` |

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
- Chat IA: similitud de Jaccard (base de conocimiento local) + API gratuita de Gemini (capa gratuita, sin tarjeta)

**Frontend**
- Angular 21 (standalone components, signals, control flow `@if`/`@for`)
- Angular Material
- Formularios reactivos
- APIs externas: Open Food Facts, wger, YouTube (IFrame), Jitsi Meet

**Despliegue (todo gratuito, sin tarjeta de crédito)**
- **Backend → Render** (contenedor Docker, plan Free)
- **Base de datos → Neon** (PostgreSQL 18 serverless)
- **Frontend → Vercel** (build estático)

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
| Sprint 3 (Frontend) | Identidad visual | Tema azul + turquesa, landing, navegación | ✅ |
| Sprint 3 (Frontend) | Documentación | Tablero Trello con 36 historias de usuario (HU66–HU101) | ✅ |
| Sprint 4 (Backend) | Autorización por roles | `anyRequest().authenticated()` + `@PreAuthorize` con `hasAuthority` (ADMIN/DOCTOR/PADRE/PACIENTE) en todos los controllers | ✅ |
| Sprint 4 (Backend) | Registro público seguro | `POST /users/web` sin token solo acepta rol PACIENTE o PADRE; un ADMIN autenticado puede crear cualquier rol | ✅ |
| Sprint 4 (Backend) | CORS (patrón del curso) | `CorsConfig` con bean `CorsConfigurationSource` + `allowCredentials(true)` | ✅ |
| Sprint 4 (Backend) | Queries de agregación | Usuarios por rol, usuarios por distrito y perfiles por especialidad (`nativeQuery`, `List<Object[]>` → DTO) | ✅ |
| Sprint 4 (Frontend) | Seguridad (patrón del curso) | `loginservice` con `showRole()`, `guard/seguridad-guard`, `components/errors/error.interceptor` (401 → login), `JwtModule` con token en `sessionStorage` | ✅ |
| Sprint 4 (Frontend) | Menú por rol | `verificar()` / `isAdmin()` / `isDoctor()` / `isPadre()` / `isPaciente()` con `@if` en el menú; cada rol solo ve lo que puede usar | ✅ |
| Sprint 4 (Frontend) | Reportes con gráficos | 3 reportes con chart.js + ng2-charts: usuarios por rol (barras), usuarios por distrito (líneas), perfiles por especialidad (pie) | ✅ |
| Sprint 4 (Datos) | Seed de perfiles profesionales | `scripts/seed_perfil_profesional.sql`: 4 especialidades + 3 perfiles para los usuarios DOCTOR | ✅ |
| Sprint 5 (Backend) | Roles simplificados e entidad **Hijo** | Se eliminó el rol PACIENTE (quedan solo ADMIN/DOCTOR/PADRE); el registro público crea PADRE. Nueva entidad **Hijo** con CRUD full stack y **propiedad por token** (un padre solo ve y gestiona a sus propios hijos); `Medicion` pasó a depender de `Hijo` | ✅ |
| Sprint 5 (Backend) | Chat IA de salud infantil | Endpoint `POST /chatIA/preguntar`: busca primero en una base de conocimiento local por **similitud de Jaccard (≥60%)** y, si no encuentra respuesta parecida, consulta la **API gratuita de Gemini**; funciona incluso sin conexión gracias al respaldo local | ✅ |
| Sprint 5 (Datos) | Base de conocimiento del chat | `scripts/seed_chat_ia.sql`: 40 preguntas y respuestas curadas de salud infantil (nutrición, ejercicio, sueño, higiene, bienestar) | ✅ |
| Sprint 5 (Frontend) | Pantalla del asistente | Ruta `/app/asistente`: interfaz de chat conectada al módulo de IA | ✅ |
| Sprint 5 (Backend + Frontend) | Reportes completos | Cobertura 100% backend↔frontend: se agregó el endpoint de conteo de alertas y **8 pantallas de reporte** nuevas más un **hub de reportes**; los 37 endpoints verificados | ✅ |
| Sprint 5 (Datos) | Datos de prueba integrales | `scripts/seed_pruebas.sql` (seed completo + chat IA en un solo archivo, con `TRUNCATE` reejecutable): **≥5 registros por entidad** — 10 usuarios (1 admin, 5 doctores, 4 padres), 6 hijos, 13 mediciones, 6 alertas, 5 especialidades y perfiles, 5 consultas virtuales, contenido y ejercicios | ✅ |
| Sprint 6 (Despliegue) | Despliegue en la nube (gratis) | Backend en **Render** (Docker), base de datos en **Neon** (PostgreSQL) y frontend en **Vercel**; todo con planes gratuitos y sin tarjeta de crédito | ✅ |
| Sprint 6 (Despliegue) | Preparación para producción | Dockerfile multi-etapa (JDK 21 → JRE 21 con ajuste de memoria), `server.port=${PORT}`, credenciales de la BD por **variables de entorno**, CORS habilitado para `*.vercel.app` y `environment.prod.ts` apuntando al backend en Render | ✅ |

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
| Seguridad por roles | Todas las rutas protegidas con JWT; `@PreAuthorize` por rol en cada controller; público solo login, registro, `GET /roles`, `GET /distritos` y Swagger | ✅ |
| Reportes con gráficos | 3 queries de agregación + 3 gráficos (barras, líneas, pie) con chart.js/ng2-charts; hub de reportes con 8 pantallas | ✅ |
| Propiedad de datos por usuario | La entidad `Hijo` valida la propiedad por token: un PADRE solo accede a sus propios hijos y mediciones | ✅ |
| Asistente con IA | `POST /chatIA/preguntar` con base de conocimiento local (Jaccard) + respaldo en Gemini gratuito | ✅ |
| Despliegue en la nube | Backend (Render) + BD (Neon) + frontend (Vercel), funcionando en producción y sin costo | ✅ |

---

## 6. Problemas encontrados y soluciones

| # | Problema | Solución |
|---|---|---|
| 1 | En el componente *actualizar* los datos no se cargaban y usaba `insert()` en vez de `update()` | Se reordenó el `ngOnInit`, se llamó a `init()` con `patchValue` y se corrigió a `update()` |
| 2 | El endpoint de actualizar de TipoContenido (`PUT /{id}`) no era uniforme con el resto | Se evaluó; se dejó funcional y se documentó el porqué |
| 3 | La barra de menú se desbordaba con muchos botones | Se agruparon las 7 entidades en un menú "Gestión" y se rediseñó la navegación |
| 4 | Los enlaces nuevos del menú salían de otro color (no blanco) | Se ajustó la regla CSS para incluir las etiquetas `<a>` |
| 5 | El formulario de login "saltaba" al mostrar errores | Animación suave del mensaje y espaciado uniforme |
| 6 | Colores rojos residuales tras cambiar el tema a azul | Reemplazo global de los colores rojos por azul/turquesa |
| 7 | Acentos rotos al crear tarjetas en Trello (Latin-1 de Git Bash) | Envío de los datos como JSON con los acentos escapados a ASCII |
| 8 | `alert()` de depuración que aparecían en la demo | Se eliminaron del código del frontend |
| 9 | Cualquier visitante podía registrarse con rol ADMIN | El registro público ahora solo acepta PACIENTE/PADRE (backend responde 403 y el combo del formulario se filtró); un ADMIN autenticado sí puede crear cualquier rol |
| 10 | Los gráficos no se refrescaban al llegar la data (la app Angular es *zoneless*) | Se agregó `ChangeDetectorRef.markForCheck()` al recibir la respuesta en los 3 componentes de reporte |
| 11 | Un usuario no-admin veía en el menú pantallas donde recibiría 403 | Menú por rol con `@if (isAdmin())` etc., siguiendo el patrón del curso |
| 12 | El plan gratuito de Koyeb (512 MB) quedaba muy justo para arrancar Spring Boot | Se desplegó el backend en **Render** (Docker) y la base de datos en **Neon**, ambos gratuitos y sin tarjeta |
| 13 | La cadena de conexión de Neon incluía `&channel_binding=require`, sintaxis de *libpq* que el driver JDBC no soporta y rompía la conexión | En la variable `DB_SSL` se dejó únicamente `?sslmode=require` |
| 14 | El *health check* por defecto (`/` o `/healthz`) devolvía 401/404 y Render marcaba el servicio como caído | Se configuró el Health Check Path a `/v3/api-docs` (endpoint público que no depende de la BD) |
| 15 | Vercel publica producción desde `main`, pero los cambios de despliegue estaban en `dali-paredes` | Se fusionó `dali-paredes → main` mediante Pull Request para que Vercel reconstruyera con la URL correcta del backend |

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

- [x] ~~Decidir si las entidades relacionales se liberan o se protegen~~ → Resuelto: **todas las rutas quedaron protegidas con JWT y autorización por rol** (`@PreAuthorize`).
- [x] ~~Probar en el navegador el flujo completo tras la migración a `sessionStorage`~~ → Verificado en producción: el login responde correctamente (HTTP 200) contra el backend desplegado.
- [x] ~~Al desplegar, mover la contraseña de la base de datos a variables de entorno~~ → Hecho: la BD se conecta por `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD/DB_SSL` en Render. (`jwt.secret` se mantiene en `application.properties` de forma intencional para la revisión de la docente.)
- [x] ~~Cargar los datos de prueba en la base de datos de producción~~ → `scripts/seed_pruebas.sql` ejecutado en el SQL Editor de Neon.
- [ ] Colocar la URL final de Vercel en la sección 1 de esta bitácora.
- [ ] Confirmar/actualizar los IDs de videos de YouTube y las imágenes del landing.
- [ ] Regenerar el token y el API Secret de Trello (quedaron expuestos durante el desarrollo).
- [ ] Nota: el plan Free de Render duerme el backend tras 15 min de inactividad; la primera petición tarda ~50 s en despertar (cold start), luego responde con normalidad.

---

## 9. Evidencias

- **Código:** repositorio en GitHub (rama `dali-paredes`, fusionada a `main` para el despliegue).
- **Aplicación en producción:** frontend en Vercel *(colocar URL `.vercel.app`)* + backend en Render (https://preventkids.onrender.com).
- **Documentación ágil:** tablero Trello con Product Backlog, Sprint 2 y lista *frontend* (HU66–HU101).
- **Documentación de API:** Swagger UI en `/swagger-ui.html` (también accesible en el backend desplegado).
- **Datos de prueba:** `scripts/seed_pruebas.sql` — usuarios de demo con contraseña `123456` (admin: `admin@preventkids.com`; doctores: `doctor1..5@preventkids.com`; padres: `padre1..4@preventkids.com`).
