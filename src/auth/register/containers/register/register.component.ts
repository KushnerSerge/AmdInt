import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {userCredentials} from "../../../shared/services/auth/security.models";

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">
          Create account
        </button>

      </auth-form>
    </div>
    `
})
export class RegisterComponent  {

  errors: string[] = [];

  constructor(private securityService: AuthService, private router: Router) { }

  registerUser(event: FormGroup) {
    this.securityService.register(event.value).
    subscribe(

      authResponse => {
        console.log(authResponse);
        this.router.navigate(['/auth/login']);
      }, error =>{

      },

    )
   // console.log(event.value);
  }

}
