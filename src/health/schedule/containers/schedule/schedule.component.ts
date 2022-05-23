import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {MealsService} from "../../../shared/meals/meals.service";
import {ScheduleService} from "../../../shared/schedule/schedule.service";

@Component({
  selector: 'schedule',
  styleUrls: ['./schedule.component.scss'],
  template: `
    <h2>Companies</h2>
    <app-generic-list></app-generic-list>
  `
})
export class ScheduleComponent  {



}
