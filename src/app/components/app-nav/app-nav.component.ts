import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-nav',
  styleUrls: ['./app-nav.component.scss'],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="schedule" routerLinkActive="active">Info</a>
        <a routerLink="meals" routerLinkActive="active">Meals</a>
        <a routerLink="workouts" routerLinkActive="active">Workouts</a>
      </div>
    </div>

  `
})

export class AppNavComponent implements OnInit {
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
