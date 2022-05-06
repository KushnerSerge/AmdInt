import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
    <!--  <h1> {{authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')}} </h1> -->

      <app-header>

      </app-header>
      <app-nav
        *ngIf="authService.isAuthenticated()" >
      </app-nav>

      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  user: string = "";

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  //   this.user =  this.authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
  }

  ngOnDestroy() {

  }
}
