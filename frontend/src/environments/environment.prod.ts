// Produccion. El build de produccion reemplaza environment.development.ts
// por este archivo (ver fileReplacements en angular.json).
// Backend desplegado en Render (Docker) conectado a la BD de Neon.
export const environment = {
    production: true,
    base: 'https://preventkids.onrender.com'
}
