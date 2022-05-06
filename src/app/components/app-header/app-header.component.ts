import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.scss'],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <p> {{authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')}} </p>
        <img src='/assets/img/logo1.svg'width="88" height="42">

         <div
            class="app-header__user-info"
         *ngIf="authService.isAuthenticated()"
         >

            <span (click)="authService.logout()"></span>
          </div>



      </div>
    </div>
  `
})
export class AppHeaderComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
