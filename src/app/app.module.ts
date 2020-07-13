import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MaterialModule } from './_material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
//import { DetallesComponent } from './pages/index/detalles/detalles.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    //DetallesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports:[
    FlexLayoutModule
    
  ],
})
export class AppModule { }
