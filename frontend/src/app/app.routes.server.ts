import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // El area autenticada depende de sessionStorage/JWT: se renderiza en el cliente.
    path: 'app',
    renderMode: RenderMode.Client
  },
  {
    path: 'app/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
