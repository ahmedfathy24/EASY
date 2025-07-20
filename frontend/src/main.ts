import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {routes} from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/services/http-interceptor.service';


bootstrapApplication(AppComponent, {
  providers: [provideRouter (routes) , provideHttpClient(),   provideHttpClient(withInterceptors([AuthInterceptor]))] 
})

