import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MealsService} from "./meals/meals.service";
import {ListItemComponent} from './components/list-item/list-item.component';
import {WorkoutsService} from "./workouts/workouts.service";
import {WorkoutPipe} from "./pipes/workout.pipe";
import {ScheduleService} from "./schedule/schedule.service";

@NgModule({
  declarations: [
    ListItemComponent,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ListItemComponent,
    WorkoutPipe
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    };
  }
}
