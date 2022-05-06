import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MealsService} from "../../../shared/meals/meals.service";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";
import {constants} from "crypto";
import {Router} from "@angular/router";


@Component({
  selector: 'meals',
  styleUrls: ['./meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="assets/img/food.svg">
          Your meals
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../meals/new']">
          <img src="assets/img/add-white.svg">
          New meal
        </a>
      </div>
      <div *ngIf="meals; else loading;">
        <div class="message" *ngIf="false">
          <img src="assets/img/face.svg">
          No meals, add a new meal to start
        </div>
        <list-item

          *ngFor="let meal of MealsWithIngredients"
          [item]="meal"
          (remove)="removeMeal($event)">

          >
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Fetching meals...
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  MealsWithIngredients: any;

  constructor(private mealsService: MealsService, private router: Router) {
  }

  meals: boolean = true;


  ngOnInit(): void {

    this.loadMeals()
  }


  loadMeals() {
     this.mealsService.getMeals()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.MealsWithIngredients=data.$values
        console.log("data este", data);
      });
  }



  removeMeal(event: any) {
    console.log("mealId for deletion is" + event.mealId);
    // this.mealsWithIng$.filter(itm =>  itm.mealId !== event.mealId);

    this.mealsService.deleteMealforUser(event.mealId).subscribe(() => {
      this.loadMeals();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
