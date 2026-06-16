import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  // En el servidor (SSR) dejamos pasar; el cliente vuelve a validar al hidratar.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
