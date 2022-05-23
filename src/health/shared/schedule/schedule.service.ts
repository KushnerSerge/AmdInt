import {environment} from "../../../environments/environment";
import {AuthService} from "../../../auth/shared/services/auth/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {mealsDto} from "../../../auth/shared/services/auth/security.models";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiURL = environment.apiURL + "companies/";

  constructor(public authService: AuthService, private http: HttpClient, private router: Router) {
  }


  getCompanies(currentPage: number, pageSize: number): Observable<any> {
    return this.http.get(this.apiURL+`?pageNumber=${currentPage}&pageSize=${pageSize}`, { observe: 'response' });
  }

  getEmployeeForCompany( companyId,currentPage: number, pageSize: number): Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', '*/*');

    return this.http.get(this.apiURL+`${companyId}/employees`+`?pageNumber=${currentPage}&pageSize=${pageSize}`, {observe: 'response',headers: headers});
  }


}

