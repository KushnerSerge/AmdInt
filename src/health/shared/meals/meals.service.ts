import {Injectable} from '@angular/core';
import {AuthService} from "../../../auth/shared/services/auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {authenticationResponse, mealDto, mealsDto, userDTO} from "../../../auth/shared/services/auth/security.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  private apiURL = environment.apiURL + "users/";
  private claimName = environment.claimName;

  constructor(public authService: AuthService, private http: HttpClient, private router: Router) {
  }

  createMeal(userData: mealsDto): Observable<any> {


    const currentUserName = this.authService.getFieldFromJWT(this.claimName);

    return this.http.post<any>(this.apiURL + currentUserName + '/meals', userData);

  }

  updateMeal(userData: mealsDto, mealId: string): Observable<any> {


    const currentUserName = this.authService.getFieldFromJWT(this.claimName);

    return this.http.put<any>(this.apiURL + currentUserName + '/meals/' + mealId, userData);

  }

  getMeals(): Observable<any> {
    const currentUserName = this.authService.getFieldFromJWT(this.claimName);
    console.log(this.apiURL + currentUserName + '/meals');
    return this.http.get(this.apiURL + currentUserName + '/meals');
  }

  getMeal(mealId:string): Observable<any> {
    const currentUserName = this.authService.getFieldFromJWT(this.claimName);
    console.log(this.apiURL + currentUserName + '/meals');
    return this.http.get(this.apiURL + currentUserName + '/meals/'+ mealId);
  }

  deleteMealforUser(id: string): Observable<any> {
    const currentUserName = this.authService.getFieldFromJWT(this.claimName);
    console.log(this.apiURL + currentUserName + '/meals');
    return this.http.delete(this.apiURL + currentUserName + '/meals/' + id);
  }

}
