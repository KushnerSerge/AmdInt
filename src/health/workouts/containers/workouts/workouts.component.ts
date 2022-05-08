import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MealsService} from "../../../shared/meals/meals.service";
import {Router} from "@angular/router";
import {WorkoutsService} from "../../../shared/workouts/workouts.service";

@Component({
  selector: 'workouts',
  styleUrls: ['./workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="assets/img/workout.svg">
          Your workouts
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../workouts/new']">
          <img src="assets/img/add-white.svg">
          New workout
        </a>
      </div>
      <div *ngIf="WorkoutObj; else loading;">
        <div class="message" *ngIf="!WorkoutObj.length">
          <img src="assets/img/face.svg">
          No workouts, add a new workout to start
        </div>
        <list-item

          *ngFor="let workout of WorkoutObj"
          [item]="workout"
          (remove)="removeWorkout($event)">

          >
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Fetching workouts...
        </div>
      </ng-template>
    </div>
  `
})



export class WorkoutsComponent implements  OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();
  WorkoutObj: any;

  constructor(private workoutsService: WorkoutsService, private router: Router) {
  }

  meals: boolean = true;


  ngOnInit(): void {

    this.loadWorkouts()
  }


  loadWorkouts() {
    this.workoutsService.getWorkouts()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.WorkoutObj=data.$values
        console.log("data workouts este", this.WorkoutObj);
      });
  }



  removeWorkout(event: any) {
    console.log("workoutId for deletion is" + event.workoutId);
    // this.mealsWithIng$.filter(itm =>  itm.mealId !== event.mealId);

    this.workoutsService.deleteWorkoutforUser(event.workoutId).subscribe(() => {
      this.loadWorkouts();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
