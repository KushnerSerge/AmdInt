import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {AuthService} from "./services/auth/auth.service";
import {AuthFormCLoginomponent} from "./components/auth-form/auth-form-login.component";
import {AuthGuard} from "./guards/auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptorService} from "./interceptors/jwt-interceptor.service";



@NgModule({
  declarations: [
    AuthFormComponent,
    AuthFormCLoginomponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  exports:[
    AuthFormComponent,
    AuthFormCLoginomponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
        },
        AuthService,
        AuthGuard
      ]
    };
  }


}
