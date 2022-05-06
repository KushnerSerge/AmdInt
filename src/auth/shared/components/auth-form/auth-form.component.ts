import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <ng-content select="h1"></ng-content>


        <label>
          <input
            type="text"
            placeholder="First Name"
            formControlName="firstname">
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            formControlName="lastname">
        </label>
        <label>
          <input
            type="text"
            placeholder="Username"
            formControlName="username">
        </label>

        <label>
          <input
            type="email"
            placeholder="Email address"
            formControlName="email">
        </label>
        <label>
          <input
            type="password"
            placeholder="Enter password"
            formControlName="password">
        </label>
        <label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            formControlName="phonenumber">
        </label>



        <div class="error" *ngIf="firstnameInvalid">
          First Name is required
        </div>
        <div class="error" *ngIf="lastnameInvalid">
          Last Name is required
        </div>
        <div class="error" *ngIf="usernameInvalid">
          UserName is required
        </div>
        <div class="error" *ngIf="emailFormat">
          Invalid email format
        </div>

        <div class="error" *ngIf="passwordInvalid">
          Password is required
        </div>

        <div class="error" *ngIf="phonenumberInvalid">
          Phone Number is required
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
export class AuthFormComponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    username: ['',Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.email],
    phonenumber: ['', Validators.required],
    roles: []

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

  get firstnameInvalid() {
    const control = this.form.get('firstname');
    return control?.hasError('required') && control?.touched;
  }

  get lastnameInvalid() {
    const control = this.form.get('lastname');
    return control?.hasError('required') && control?.touched;
  }

  get usernameInvalid() {
    const control = this.form.get('username');
    return control?.hasError('required') && control?.touched;
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control?.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control?.hasError('email') && control?.touched;
  }

  get phonenumberInvalid() {
    const control = this.form.get('phonenumber');
    return control?.hasError('required') && control?.touched;
  }

}
