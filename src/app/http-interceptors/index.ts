import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../logging-interceptor/logging-interceptor.component';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
];
