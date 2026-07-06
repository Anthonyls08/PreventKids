import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { errorInterceptor } from './components/errors/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment.development';

// Host del backend sin protocolo (angular-jwt lo pide asi), derivado del environment.
// En local: localhost:8080 ; en produccion: la URL del backend en Koyeb.
const apiHost = environment.base.replace(/^https?:\/\//, '');

export function tokenGetter() {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.sessionStorage.getItem('token');
  return token && token.split('.').length === 3 ? token : null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor]),
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: [apiHost],
          disallowedRoutes: [`${environment.base}/login`],
        },
      })
    ),
  ],
};