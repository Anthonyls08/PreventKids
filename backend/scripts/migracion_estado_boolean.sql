-- Migración: columna "estado" de Users de texto (varchar) a boolean
-- Ejecutar UNA sola vez en la base de datos PreventKids (pgAdmin o psql).
-- Motivo: la columna se creó como texto cuando "estado" era String; ddl-auto=update
-- no convierte columnas existentes, así que hay que migrarla a mano sin perder datos.

-- 1) (Opcional) Revisa qué valores tienes ANTES de convertir:
--    SELECT estado, count(*) FROM "Users" GROUP BY estado;

-- 2) Conversión: cualquier valor "verdadero" se vuelve true, el resto false.
ALTER TABLE "Users"
    ALTER COLUMN estado DROP DEFAULT;

ALTER TABLE "Users"
    ALTER COLUMN estado TYPE boolean
    USING (
        CASE
            WHEN lower(trim(estado)) IN ('true', 't', '1', 'activo', 'active', 'si', 'sí', 'y', 'yes')
                THEN true
            ELSE false
        END
    );

ALTER TABLE "Users"
    ALTER COLUMN estado SET NOT NULL,
    ALTER COLUMN estado SET DEFAULT true;

-- 3) Verifica el resultado:
--    SELECT estado, count(*) FROM "Users" GROUP BY estado;
