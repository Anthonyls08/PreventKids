-- ============================================================================
-- PreventKids - Seed COMPLETO (resetea y llena toda la BD para pruebas)
--
-- Borra TODOS los datos y carga un juego coherente con >=5 registros por
-- entidad (salvo role, que por diseno son solo 3). Usuarios: 1 admin,
-- 5 doctores (cada uno con perfil profesional) y 4 padres duenos de 6 hijos.
--
-- Contrasena de TODOS los usuarios: 123456 (hash BCrypt del backend)
-- Despues de este script se agrega tambien seed_chat_ia.sql (base del chat).
--
-- Ejecutar: psql -h localhost -U postgres -d PreventKids -f seed_completo.sql
-- (o pegar en el SQL Editor de Neon)
-- ============================================================================

-- 0) LIMPIEZA TOTAL -----------------------------------------------------------
TRUNCATE TABLE alert, medicion, hijo, virtual_consultation, educational_content,
  recommended_exercise, professional_profile, specialty, tipo_alerta,
  tipo_contenido, users, physical_limitation, district, role, chatia
  RESTART IDENTITY CASCADE;

-- 1) ROLES (solo 3: los ninos no tienen cuenta) --------------------------------
INSERT INTO role (nombre, descripcion) VALUES
('ADMIN',  'Administrador del sistema'),
('DOCTOR', 'Profesional de salud'),
('PADRE',  'Padre o tutor del nino monitoreado');

-- 2) DISTRITOS (8) --------------------------------------------------------------
INSERT INTO district (name_district, name_department, zone, ubigeo) VALUES
('Miraflores',  'Lima', 'Lima Centro', 150122),
('San Isidro',  'Lima', 'Lima Centro', 150131),
('Barranco',    'Lima', 'Lima Sur',    150104),
('Surco',       'Lima', 'Lima Sur',    150140),
('La Molina',   'Lima', 'Lima Este',   150114),
('San Borja',   'Lima', 'Lima Centro', 150130),
('Jesus Maria', 'Lima', 'Lima Centro', 150113),
('Chorrillos',  'Lima', 'Lima Sur',    150108);

-- 3) LIMITACIONES FISICAS (5) ---------------------------------------------------
INSERT INTO physical_limitation
  (name_limitation, category_limitation, description_limitation, intensity_limitation, prohibited_exercises) VALUES
('Asma',              'Respiratoria', 'Dificultad respiratoria ante esfuerzo intenso o aire frio',   'Baja',     'Carreras largas'),
('Lesion de rodilla', 'Motora',       'Molestia en rodilla derecha tras caida, en recuperacion',     'Moderada', 'Saltos e impacto'),
('Cardiopatia leve',  'Cardiaca',     'Soplo cardiaco leve controlado, requiere esfuerzo gradual',   'Moderada', 'Alta intensidad'),
('Diabetes tipo 1',   'Metabolica',   'Requiere control de glucosa; esfuerzo moderado supervisado',  'Moderada', 'Ayuno prolongado'),
('Sobrepeso',         'Nutricional',  'Exceso de peso leve, apto para actividad progresiva',         'Baja',     'Alta intensidad');

-- 4) USUARIOS (1 admin, 5 doctores, 4 padres = 10) ------------------------------
INSERT INTO users
  (nombre, apellido, email, password, genero, fechanacimiento, telefono, estado, id_role, id_district)
VALUES
('Dali',   'Paredes',   'admin@preventkids.com',   '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1998-05-10', 987111222, true,
   (SELECT id_role FROM role WHERE nombre='ADMIN'  LIMIT 1), (SELECT id_district FROM district WHERE name_district='Miraflores'  LIMIT 1)),
('Carlos', 'Ramirez',   'doctor1@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1985-03-22', 987222333, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR' LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Isidro'  LIMIT 1)),
('Lucia',  'Fernandez', 'doctor2@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1990-07-14', 987333444, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR' LIMIT 1), (SELECT id_district FROM district WHERE name_district='La Molina'   LIMIT 1)),
('Andrea', 'Quispe',    'doctor3@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1995-06-12', 987888999, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR' LIMIT 1), (SELECT id_district FROM district WHERE name_district='Chorrillos'  LIMIT 1)),
('Miguel', 'Torres',    'doctor4@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1983-09-30', 987444555, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR' LIMIT 1), (SELECT id_district FROM district WHERE name_district='Surco'       LIMIT 1)),
('Sofia',  'Rios',      'doctor5@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1987-01-19', 987555666, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR' LIMIT 1), (SELECT id_district FROM district WHERE name_district='Barranco'    LIMIT 1)),
('Jorge',  'Diaz',      'padre1@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1988-11-18', 987666777, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'  LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Borja'   LIMIT 1)),
('Rosa',   'Mendoza',   'padre2@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1991-02-27', 987777888, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'  LIMIT 1), (SELECT id_district FROM district WHERE name_district='Jesus Maria' LIMIT 1)),
('Camila', 'Vargas',    'padre3@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1993-08-08', 986000111, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'  LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Isidro'  LIMIT 1)),
('Pedro',  'Herrera',   'padre4@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1986-04-03', 986111222, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'  LIMIT 1), (SELECT id_district FROM district WHERE name_district='Surco'       LIMIT 1));

-- 5) HIJOS (6 ninos, cada uno con su padre) --------------------------------------
INSERT INTO hijo (nombre, apellido, fechanacimiento, genero, id_user, id_physical_limitation) VALUES
('Mateo',    'Diaz',    '2015-01-30', 'Masculino', (SELECT id_user FROM users WHERE email='padre1@preventkids.com' LIMIT 1),
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Asma' LIMIT 1)),
('Sofia',    'Diaz',    '2018-03-14', 'Femenino',  (SELECT id_user FROM users WHERE email='padre1@preventkids.com' LIMIT 1), NULL),
('Valentina','Mendoza', '2016-09-05', 'Femenino',  (SELECT id_user FROM users WHERE email='padre2@preventkids.com' LIMIT 1), NULL),
('Thiago',   'Mendoza', '2014-06-22', 'Masculino', (SELECT id_user FROM users WHERE email='padre2@preventkids.com' LIMIT 1),
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Cardiopatia leve' LIMIT 1)),
('Diego',    'Vargas',  '2014-12-01', 'Masculino', (SELECT id_user FROM users WHERE email='padre3@preventkids.com' LIMIT 1),
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Lesion de rodilla' LIMIT 1)),
('Luana',    'Herrera', '2016-02-11', 'Femenino',  (SELECT id_user FROM users WHERE email='padre4@preventkids.com' LIMIT 1),
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Diabetes tipo 1' LIMIT 1));

-- 6) MEDICIONES (ids 1-13; cubren todos los reportes) ----------------------------
-- Mateo (hijo 1): sobrepeso sostenido -> alerta IMC
INSERT INTO medicion (peso_kg, talla_cm, imc, clasificacion_imc, presion, temperatura, fecha_medicion, id_hijo) VALUES
(48.0, 134, 26.7, 'Sobrepeso', 100, 36.5, '2026-06-01', 1),
(49.5, 135, 27.2, 'Sobrepeso', 105, 36.8, '2026-06-15', 1),
(50.2, 135, 27.5, 'Sobrepeso', 110, 37.0, '2026-07-01', 1),
-- Valentina (hijo 3): bajo peso -> riesgo nutricional
(22.0, 118, 15.8, 'Bajo peso',  90, 36.4, '2026-06-10', 3),
(23.5, 119, 16.6, 'Bajo peso',  92, 36.5, '2026-07-02', 3),
-- Diego (hijo 5): obesidad + un episodio de fiebre -> nutricional y signos vitales
(58.0, 138, 30.5, 'Obesidad',  118, 36.9, '2026-06-05', 5),
(59.0, 138, 31.0, 'Obesidad',  122, 38.6, '2026-06-20', 5),
-- Sofia (hijo 2): normal (control sano)
(28.0, 122, 18.8, 'Normal',     95, 36.5, '2026-06-12', 2),
(28.5, 123, 18.8, 'Normal',     96, 36.6, '2026-07-03', 2),
-- Thiago (hijo 4): progreso de sobrepeso a normal
(44.0, 128, 26.9, 'Sobrepeso', 108, 36.7, '2026-05-20', 4),
(41.5, 129, 24.9, 'Normal',    100, 36.5, '2026-06-25', 4),
-- Luana (hijo 6): control de diabetes, peso normal
(32.0, 130, 18.9, 'Normal',     98, 36.6, '2026-06-08', 6),
(33.0, 131, 19.2, 'Normal',     99, 36.7, '2026-07-02', 6);

-- 7) TIPOS DE ALERTA (5) ---------------------------------------------------------
INSERT INTO tipo_alerta (nombre, descripcion, mensaje, nivelriesgo, atencionprof) VALUES
('IMC elevado',       'El indice de masa corporal supera el rango saludable para la edad', 'El IMC del nino supera el rango saludable, revise su plan de alimentacion', 3, true),
('Fiebre',            'Temperatura corporal por encima de 38 grados',                      'El nino presenta fiebre, controle la temperatura y consulte al medico',     3, true),
('Presion elevada',   'Presion arterial por encima del rango esperado para la edad',       'La presion del nino esta elevada, se recomienda evaluacion medica',         2, true),
('Control rutinario', 'Recordatorio de control periodico de crecimiento',                  'Es momento del control de peso y talla del nino',                          1, false),
('Bajo peso',         'Peso por debajo del rango saludable para la edad',                  'El peso del nino esta bajo, se recomienda evaluacion nutricional',           2, true);

-- 8) ALERTAS (6, sobre las mediciones de arriba) ---------------------------------
INSERT INTO alert (generationdate, leida, id_medicion, id_tipoalerta) VALUES
('2026-07-01', false, 3, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='IMC elevado'       LIMIT 1)),
('2026-06-20', false, 7, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='Fiebre'            LIMIT 1)),
('2026-06-20', false, 7, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='Presion elevada'   LIMIT 1)),
('2026-06-05', true,  6, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='IMC elevado'       LIMIT 1)),
('2026-07-03', true,  9, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='Control rutinario' LIMIT 1)),
('2026-07-02', false, 4, (SELECT id_tipoalerta FROM tipo_alerta WHERE nombre='Bajo peso'         LIMIT 1));

-- 9) ESPECIALIDADES (5, nombres/areas identicos a los selects del frontend) ------
INSERT INTO specialty (nombre, descripcion, area, atencionvirtual) VALUES
('Pediatría',           'Atencion integral de la salud del nino',         'Medicina General',         true),
('Nutrición Infantil',  'Evaluacion y planes de alimentacion para ninos', 'Nutrición y Dietética',    true),
('Fisioterapia',        'Rehabilitacion fisica y ejercicios adaptados',   'Rehabilitación y Terapia', false),
('Psicología Infantil', 'Salud mental y desarrollo emocional del nino',   'Salud Mental',             true),
('Endocrinología',      'Control hormonal y metabolico (diabetes, etc.)', 'Medicina Especializada',   true);

-- 10) PERFILES PROFESIONALES (5, uno por doctor) ---------------------------------
INSERT INTO professional_profile (numerocolegiatura, institucion, id_user, id_specialty) VALUES
('CMP-45821',  'Hospital del Nino',
   (SELECT id_user FROM users WHERE email='doctor1@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Pediatría' LIMIT 1)),
('CNP-11234',  'Clinica San Felipe',
   (SELECT id_user FROM users WHERE email='doctor2@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Nutrición Infantil' LIMIT 1)),
('CTMP-30877', 'Centro de Rehabilitacion Infantil',
   (SELECT id_user FROM users WHERE email='doctor3@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Fisioterapia' LIMIT 1)),
('CPP-55012',  'Instituto de Salud Mental Infantil',
   (SELECT id_user FROM users WHERE email='doctor4@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Psicología Infantil' LIMIT 1)),
('CMP-60233',  'Hospital Nacional del Nino',
   (SELECT id_user FROM users WHERE email='doctor5@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Endocrinología' LIMIT 1));

-- 11) CONSULTAS VIRTUALES (5, padres con los especialistas) ----------------------
INSERT INTO virtual_consultation (estado, fechacita, proveedor, urlsala, id_professional_profile, id_user) VALUES
('Pendiente',  '2026-07-10 10:00:00', 'Jitsi', 'https://meet.jit.si/PreventKids-Mateo-Pediatria',      1, (SELECT id_user FROM users WHERE email='padre1@preventkids.com' LIMIT 1)),
('Confirmada', '2026-07-08 16:30:00', 'Jitsi', 'https://meet.jit.si/PreventKids-Valentina-Nutricion',  2, (SELECT id_user FROM users WHERE email='padre2@preventkids.com' LIMIT 1)),
('Finalizada', '2026-06-28 11:00:00', 'Jitsi', 'https://meet.jit.si/PreventKids-Diego-Fisioterapia',   3, (SELECT id_user FROM users WHERE email='padre3@preventkids.com' LIMIT 1)),
('Pendiente',  '2026-07-12 09:00:00', 'Jitsi', 'https://meet.jit.si/PreventKids-Luana-Psicologia',     4, (SELECT id_user FROM users WHERE email='padre4@preventkids.com' LIMIT 1)),
('Confirmada', '2026-07-11 15:00:00', 'Jitsi', 'https://meet.jit.si/PreventKids-Luana-Endocrino',      5, (SELECT id_user FROM users WHERE email='padre4@preventkids.com' LIMIT 1));

-- 12) TIPOS DE CONTENIDO (5) -----------------------------------------------------
INSERT INTO tipo_contenido (nombre, descripcion, duracion) VALUES
('Video',      'Contenido audiovisual educativo',       10),
('Articulo',   'Lectura informativa para padres',        5),
('Infografia', 'Resumen visual de un tema de salud',     3),
('Podcast',    'Audio breve sobre salud infantil',      15),
('Taller',     'Actividad practica guiada para familias', 30);

-- 13) CONTENIDO EDUCATIVO (5, titulo max 20 caracteres) --------------------------
INSERT INTO educational_content
  (tittle_educational_content, descriptionec, typeec, url_content, id_professional_profile, id_tipocontenido) VALUES
('Plato saludable', 'Guia del plato balanceado para ninos en crecimiento',        'Nutricion', 'https://www.youtube.com/watch?v=ejemplo1', 2, 1),
('Rutina en casa',  'Ejercicios divertidos de 15 minutos para hacer en familia',  'Ejercicio', 'https://www.youtube.com/watch?v=ejemplo2', 3, 1),
('Menos azucar',    'Como reducir el azucar en la lonchera escolar',              'Nutricion', 'https://ejemplo.pe/articulo-azucar',       2, 2),
('Sueno infantil',  'Horas de sueno recomendadas por edad para un buen descanso', 'Habitos',   'https://ejemplo.pe/infografia-sueno',      1, 3),
('Salud emocional', 'Como acompanar las emociones de los ninos en casa',          'Bienestar', 'https://ejemplo.pe/podcast-emociones',     4, 4);

-- 14) EJERCICIOS RECOMENDADOS (5, nombre max 20 caracteres) ----------------------
INSERT INTO recommended_exercise
  (name_recommended_exercise, description_re_exercise, difficult_recommended_exercise, duration_recommended_exercise, date_recommended_exercise, id_physical_limitation) VALUES
('Caminata rapida', 'Caminata a ritmo moderado en el parque, ideal para iniciar actividad fisica', 'Facil', 30, '2026-06-01', NULL),
('Natacion suave',  'Estilo libre a ritmo comodo, de bajo impacto para las articulaciones',        'Media', 40, '2026-06-10',
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Lesion de rodilla' LIMIT 1)),
('Bicicleta',       'Paseo en bicicleta con casco, aumentando la resistencia poco a poco',         'Media', 45, '2026-06-15', NULL),
('Yoga para ninos', 'Posturas basicas y respiracion, mejora la postura y reduce el estres',        'Facil', 20, '2026-06-20',
   (SELECT id_physical_limitation FROM physical_limitation WHERE name_limitation='Asma' LIMIT 1)),
('Baile divertido', 'Coreografias simples que suben el ritmo cardiaco jugando en familia',         'Facil', 25, '2026-06-22', NULL);

-- Verificacion rapida
-- SELECT 'users' t, count(*) FROM users UNION ALL SELECT 'hijo', count(*) FROM hijo
-- UNION ALL SELECT 'medicion', count(*) FROM medicion UNION ALL SELECT 'alert', count(*) FROM alert
-- UNION ALL SELECT 'profile', count(*) FROM professional_profile;
