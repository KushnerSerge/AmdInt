import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MealsService} from "../../../shared/meals/meals.service";
import {mealDto, mealsDto} from "../../../../auth/shared/services/auth/security.models";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-meal',
  styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal">
        <div class="meal__title">
          <h1>
            <img src="assets/img/food.svg">
            <span>
            {{ flag ? 'Edit' : 'Create' }} meal
          </span>
            <ng-template #title>
              Loading...
            </ng-template>
          </h1>
        </div>
        <div>
          <meal-form
            [meal]="meal$"
            (create)="addMeal($event)"
            (update)="updateMeal($event)"
            (remove)="removeMeal($event)">
          </meal-form>
        </div>
      </div>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  flag: boolean = true;
  meal$: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(private mealService: MealsService, private router: Router, private route: ActivatedRoute) {

  }

  MealwithIngredientsForDb: mealsDto = {
    name: "",
    ingredients: []
  }

  addMeal(event: mealDto) {
    // am primit obiectul cu array de stringuri si am create in acel array un obiect care sa contina acele stringuri sa coincida cu obiectul pentru postrequest
    console.log('Meal Dto este:', event.ingredients);
    this.MealwithIngredientsForDb.name = event.name;

    event.ingredients.forEach((value) => {
      this.MealwithIngredientsForDb.ingredients.push({"name": value});
    });


    this.mealService.createMeal(this.MealwithIngredientsForDb).subscribe(data => {
      this.router.navigate(['/meals']);
    })
  }

  async updateMeal(event: any) {
    // am primit obiectul cu array de stringuri si am create in acel array un obiect care sa contina acele stringuri sa coincida cu obiectul pentru postrequest

    this.MealwithIngredientsForDb.name = event.name;

    event.ingredients.forEach((val: any) => {
      this.MealwithIngredientsForDb.ingredients.push({"name": val});
    });

    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(params => {
      this.mealService.updateMeal(this.MealwithIngredientsForDb, params['id'])
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(data => {
          this.router.navigate(['/meals']);
        })
    });

  }

  async removeMeal(event: any) {
    this.mealService.deleteMealforUser(this.meal$.mealId)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.router.navigate(['/meals']);
      })
  }


  ngOnInit(): void {

    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(params => {
      if (params['id']) {
        this.mealService.getMeal(params['id'])
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(data => {
            this.meal$ = data;
            console.log(this.meal$);
          });
      } else this.flag = false
    })

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
