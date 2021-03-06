import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

import {WorkoutComponent} from "./containers/workout/workout.component";
import {WorkoutFormComponent} from "./components/workout-form/workout-form.component";
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent },
];

@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent,
    WorkoutTypeComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class WorkoutsModule { }
