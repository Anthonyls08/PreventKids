-- ============================================================================
-- PreventKids - Migracion: roles restringidos + entidad Hijo
--
-- Contexto: los ninos ya no tienen cuenta propia (rol PACIENTE eliminado).
-- El padre los registra como "hijos" dentro de la app y las mediciones
-- apuntan a la tabla hijo en vez de users.
--
-- Requisito: el backend nuevo debe haber arrancado al menos una vez para que
-- Hibernate cree la tabla hijo y la columna id_hijo en medicion.
-- Ejecutar UNA sola vez sobre la BD "PreventKids".
-- ============================================================================

-- 1) Los usuarios de prueba con rol PACIENTE eran ninos: se convierten en
--    hijos de los padres de prueba
INSERT INTO hijo (nombre, apellido, fechanacimiento, genero, id_user, id_physical_limitation)
SELECT u.nombre, u.apellido, u.fechanacimiento, u.genero,
       (SELECT id_user FROM users WHERE email='padre1@preventkids.com'), NULL
FROM users u JOIN role r ON u.id_role = r.id_role
WHERE u.email = 'paciente1@preventkids.com' AND r.nombre = 'PACIENTE';

INSERT INTO hijo (nombre, apellido, fechanacimiento, genero, id_user, id_physical_limitation)
SELECT u.nombre, u.apellido, u.fechanacimiento, u.genero,
       (SELECT id_user FROM users WHERE email='padre2@preventkids.com'), NULL
FROM users u JOIN role r ON u.id_role = r.id_role
WHERE u.email = 'paciente2@preventkids.com' AND r.nombre = 'PACIENTE';

INSERT INTO hijo (nombre, apellido, fechanacimiento, genero, id_user, id_physical_limitation)
SELECT u.nombre, u.apellido, u.fechanacimiento, u.genero,
       (SELECT id_user FROM users WHERE email='camila@preventkids.com'), NULL
FROM users u JOIN role r ON u.id_role = r.id_role
WHERE u.email = 'diego@preventkids.com' AND r.nombre = 'PACIENTE';

-- 2) Se eliminan las cuentas de los ninos (ya existen como hijos)
DELETE FROM users
WHERE id_role = (SELECT id_role FROM role WHERE nombre='PACIENTE' LIMIT 1);

-- 3) Se elimina el rol PACIENTE (ya sin usuarios)
DELETE FROM role WHERE nombre = 'PACIENTE';

-- 4) Medicion ya no apunta a users: se elimina la columna antigua
ALTER TABLE medicion DROP COLUMN IF EXISTS id_user;

-- Verificacion rapida
-- SELECT h.nombre, h.apellido, u.email AS padre FROM hijo h JOIN users u ON h.id_user = u.id_user;
-- SELECT nombre FROM role ORDER BY nombre;
