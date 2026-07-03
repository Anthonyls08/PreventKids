-- Seed de especialidades y perfiles profesionales (tablas de Dali: Role, User, ProfessionalProfile)
-- Requiere haber ejecutado antes seed_test_data.sql (roles, distritos y usuarios).
-- Ejecutar: psql -h localhost -U postgres -d PreventKids -f seed_perfil_profesional.sql

-- Especialidades (FK obligatoria de professional_profile)
INSERT INTO specialty (nombre, descripcion, area, atencionvirtual) VALUES
('Pediatria',           'Atencion integral de la salud del nino',        'Medicina',      true),
('Nutricion Infantil',  'Evaluacion y planes de alimentacion para ninos','Nutricion',     true),
('Fisioterapia',        'Rehabilitacion fisica y ejercicios adaptados',  'Rehabilitacion',false),
('Psicologia Infantil', 'Salud mental y desarrollo emocional del nino',  'Psicologia',    true);

-- Perfiles profesionales para los usuarios con rol DOCTOR del seed
INSERT INTO professional_profile (numerocolegiatura, institucion, id_user, id_specialty) VALUES
('CMP-45821', 'Hospital del Nino',
   (SELECT id_user FROM users WHERE email='doctor1@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Pediatria' LIMIT 1)),
('CNP-11234', 'Clinica San Felipe',
   (SELECT id_user FROM users WHERE email='doctor2@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Nutricion Infantil' LIMIT 1)),
('CTMP-30877', 'Centro de Rehabilitacion Infantil',
   (SELECT id_user FROM users WHERE email='andrea@preventkids.com' LIMIT 1),
   (SELECT id_specialty FROM specialty WHERE nombre='Fisioterapia' LIMIT 1));

-- Verificacion rapida
-- SELECT pp.id_professional_profile, pp.numerocolegiatura, pp.institucion, u.nombre, s.nombre
-- FROM professional_profile pp
-- JOIN users u ON u.id_user = pp.id_user
-- JOIN specialty s ON s.id_specialty = pp.id_specialty;
