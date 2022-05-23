import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
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
export class AppComponent  {

  constructor(public authService: AuthService) {}

}
