import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-form-login',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <ng-content select="h1"></ng-content>




        <label>
          <input
            type="text"
            placeholder="username"
            formControlName="username">
        </label>
        <label>
          <input
            type="password"
            placeholder="Enter password"
            formControlName="password">
        </label>

        <div class="error" *ngIf="usernameInvalid">
          UserName is required
        </div>

        <div class="error" *ngIf="passwordInvalid">
          Password is required
        </div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>

      </form>
    </div>
  `
})
export class AuthFormCLoginomponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }



  get passwordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control?.touched;
  }

  get usernameInvalid() {
    const control = this.form.get('username');
    return control?.hasError('username') && control?.touched;
  }



}
