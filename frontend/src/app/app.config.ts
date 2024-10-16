import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true,
    }, 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
