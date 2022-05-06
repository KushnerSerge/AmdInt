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

  constructor(public authService: AuthService, private http: HttpClient, private router: Router) {
  }

  createMeal(userData: mealsDto): Observable<any> {


    const currentUserName = this.authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');

    return this.http.post<any>(this.apiURL + currentUserName + '/meals', userData);

  }

  getMeals(): Observable<any> {
    const currentUserName = this.authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
    console.log(this.apiURL + currentUserName + '/meals');
    return this.http.get(this.apiURL + currentUserName + '/meals');
  }

  deleteMealforUser(id: string): Observable<any> {
    const currentUserName = this.authService.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
    console.log(this.apiURL + currentUserName + '/meals');
    return this.http.delete(this.apiURL + currentUserName + '/meals/' + id);
  }

}
