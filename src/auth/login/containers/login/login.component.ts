import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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
  private ngUnsubscribe = new Subject<void>();

  loginUser(event: FormGroup) {
    console.log(event.value);

    this.securityService.login(event.value)
      .pipe(
      takeUntil(this.ngUnsubscribe)
      ).subscribe(authenticationResponse => {
      this.securityService.saveToken(authenticationResponse);
      this.router.navigate(['/']);
    });
    this.securityService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}


