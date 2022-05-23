import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "./material.module";
import {GenericListComponent} from "./containers/generic-list/generic-list.component";
import {EmployeesComponent} from "./containers/schedule/EmployeesComponent";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatGridListModule} from "@angular/material/grid-list";


export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent },
  {
    path: ':id', component: EmployeesComponent
  }
];


@NgModule({
  declarations: [
    ScheduleComponent,
    GenericListComponent,
    EmployeesComponent,

  ],
  imports: [
    MaterialModule,
    MatGridListModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ScheduleModule { }
