import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Authservice } from '../services/authservice';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Authservice);
  const token = auth.getToken();

  // No adjuntamos token a login/registro ni a APIs externas (http otra origin distinta a la nuestra).
  const esApiExterna = !req.url.includes('localhost:8080');
  const esLogin = req.url.endsWith('/login') || req.url.endsWith('/users/web');

  if (token && !esApiExterna && !esLogin) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
