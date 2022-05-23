import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './containers/app/app.component';
import {RouterModule, Routes} from "@angular/router";
import {Store} from "store";
import {AuthModule} from "../auth/auth.module";
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import {HealthModule} from "../health/health.module";
import {JwtInterceptorService} from "../auth/shared/interceptors/jwt-interceptor.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HttpClientModule,
    HealthModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
