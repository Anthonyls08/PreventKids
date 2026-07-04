-- ============================================================================
-- PreventKids - Datos de prueba (seed)
-- Genera roles, distritos y usuarios para probar registro/login y la tabla.
--
-- Contrasena de TODOS los usuarios: 123456
-- (guardada como hash BCrypt generado con el mismo encoder del backend)
--
-- Ejecutar UNA sola vez sobre la BD "PreventKids".
-- Las FKs (id_role / id_district) se resuelven por subconsulta, asi que no
-- importa que id autogeneraron las tablas.
-- ============================================================================

-- 1) ROLES ------------------------------------------------------------------
-- Solo existen 3 roles: los ninos no tienen cuenta (el padre los registra
-- como hijos en la tabla hijo).
INSERT INTO role (nombre, descripcion) VALUES
('ADMIN',    'Administrador del sistema'),
('DOCTOR',   'Profesional de salud'),
('PADRE',    'Padre o tutor del nino monitoreado');

-- 2) DISTRITOS --------------------------------------------------------------
-- name_district y zone son varchar(20); ubigeo es entero.
INSERT INTO district (name_district, name_department, zone, ubigeo) VALUES
('Miraflores',  'Lima', 'Lima Centro', 150122),
('San Isidro',  'Lima', 'Lima Centro', 150131),Ñ
('Barranco',    'Lima', 'Lima Sur',    150104),
('Surco',       'Lima', 'Lima Sur',    150140),
('La Molina',   'Lima', 'Lima Este',   150114),
('San Borja',   'Lima', 'Lima Centro', 150130),
('Jesus Maria', 'Lima', 'Lima Centro', 150113),
('Chorrillos',  'Lima', 'Lima Sur',    150108);

-- 3) USERS ------------------------------------------------------------------
-- password = 123456 (BCrypt). estado = true (habilitado, si no, no hay login).
INSERT INTO users
  (nombre, apellido, email, password, genero, fechanacimiento, telefono, estado, id_role, id_district)
VALUES
('Dali',    'Paredes',  'admin@preventkids.com',   '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1998-05-10', 987111222, true,
   (SELECT id_role FROM role WHERE nombre='ADMIN'    LIMIT 1), (SELECT id_district FROM district WHERE name_district='Miraflores'  LIMIT 1)),
('Carlos',  'Ramirez',  'doctor1@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1985-03-22', 987222333, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR'   LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Isidro'  LIMIT 1)),
('Lucia',   'Fernandez','doctor2@preventkids.com', '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1990-07-14', 987333444, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR'   LIMIT 1), (SELECT id_district FROM district WHERE name_district='La Molina'   LIMIT 1)),
('Jorge',   'Diaz',     'padre1@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Masculino', '1988-11-18', 987666777, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'    LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Borja'   LIMIT 1)),
('Rosa',    'Mendoza',  'padre2@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1991-02-27', 987777888, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'    LIMIT 1), (SELECT id_district FROM district WHERE name_district='Jesus Maria' LIMIT 1)),
('Andrea',  'Quispe',   'andrea@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1995-06-12', 987888999, true,
   (SELECT id_role FROM role WHERE nombre='DOCTOR'   LIMIT 1), (SELECT id_district FROM district WHERE name_district='Chorrillos'  LIMIT 1)),
('Camila',  'Vargas',   'camila@preventkids.com',  '$2a$10$OTSY/zBr1EFkiUjMuX8ixupBgV99.DZ43UqsTEHYxcBPmkB.GdS.O', 'Femenino',  '1993-08-08', 986000111, true,
   (SELECT id_role FROM role WHERE nombre='PADRE'    LIMIT 1), (SELECT id_district FROM district WHERE name_district='San Isidro'  LIMIT 1));

-- 4) HIJOS ------------------------------------------------------------------
-- Los ninos monitoreados: cada uno pertenece a un padre (tabla hijo, la crea
-- Hibernate al arrancar el backend).
INSERT INTO hijo (nombre, apellido, fechanacimiento, genero, id_user, id_physical_limitation) VALUES
('Mateo',    'Gonzales', '2015-01-30', 'Masculino', (SELECT id_user FROM users WHERE email='padre1@preventkids.com' LIMIT 1), NULL),
('Valentina','Torres',   '2016-09-05', 'Femenino',  (SELECT id_user FROM users WHERE email='padre2@preventkids.com' LIMIT 1), NULL),
('Diego',    'Rojas',    '2014-12-01', 'Masculino', (SELECT id_user FROM users WHERE email='camila@preventkids.com'  LIMIT 1), NULL);

-- Verificacion rapida
-- SELECT id_user, nombre, email, estado, id_role, id_district FROM users ORDER BY id_user;
-- SELECT h.nombre, h.apellido, u.email AS padre FROM hijo h JOIN users u ON h.id_user = u.id_user;
