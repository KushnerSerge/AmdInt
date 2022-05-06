import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {MealsService} from "../../../shared/meals/meals.service";
import {mealDto, mealsDto} from "../../../../auth/shared/services/auth/security.models";

@Component({
  selector: 'app-meal',
    styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal">
        <div class="meal__title">
          <h1>
            <img src="assets/img/food.svg">
            <span>Create meal</span>
          </h1>
        </div>
        <div>
          <meal-form
            (create)="addMeal($event)">
          </meal-form>
        </div>
      </div>
    </div>
  `
})
export class MealComponent  {


  constructor(private mealService: MealsService, private router: Router) {

  }
   MealwithIngredientsForDb : mealsDto = {
    name: "",
     ingredients:[]
   }
  addMeal(event: mealDto) {
    // am primit obiectul cu array de stringuri si am create in acel array un obiect care sa contina acele stringuri sa coincida cu obiectul pentru postrequest
    console.log('Meal Dto este:', event.ingredients);
    this.MealwithIngredientsForDb.name = event.name;

    event.ingredients.forEach((value)=> {
      this.MealwithIngredientsForDb.ingredients.push({"name": value});
    });


    this.mealService.createMeal(this.MealwithIngredientsForDb).subscribe(data => {
           this.router.navigate(['/meals']);
    })


  }

}
