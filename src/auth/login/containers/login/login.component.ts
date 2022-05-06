import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form-login (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
          Login
        </button>
      </auth-form-login>
    </div>
  `,

})
export class LoginComponent {

  constructor(private securityService: AuthService, private router: Router) {
  }

  errors: string[] = [];
  loginUser(event: FormGroup) {
    console.log(event.value);
    this.errors = [];
    this.securityService.login(event.value).subscribe(authenticationResponse => {
      console.log(authenticationResponse);
      this.securityService.saveToken(authenticationResponse);
      this.router.navigate(['/']);
    }, error => {console.log( error)});
this.securityService.isAuthenticated();
  }
  }


