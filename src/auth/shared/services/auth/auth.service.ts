import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {authenticationResponse, userCredentials, userDTO} from "./security.models";
import {environment} from "../../../../environments/environment";
import * as jwt from 'jsonwebtoken';
import {Store} from "store";
import {Router} from "@angular/router";

export interface User {
  username: string,
  authenticated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient, private router: Router) { }

  private apiURL = environment.apiURL + "authentication";
  private readonly tokenKey: string = 'token';
  private readonly refreshTokenKey: string = 'refresh-token'




  register(userCredentials: userCredentials): Observable<any>{

    var postreqObj = {...userCredentials, roles: ["Manager", "Administrator"]};
     console.log(userCredentials);
    return this.http.post<any>(this.apiURL , postreqObj);
  }

  login(userData: userDTO): Observable<authenticationResponse>{
    return this.http.post<authenticationResponse>(this.apiURL + "/login", userData);
  }

  saveToken(authenticationResponse: authenticationResponse){
    console.log("am salvat urmatorul token");
    console.log(authenticationResponse.token);
    localStorage.setItem(this.tokenKey, authenticationResponse.token);

  }


  isAuthenticated(): boolean{
    const token = localStorage.getItem(this.tokenKey);

    //console.log(String(token));
    if (!token){
      return false;
    }

    //this.getFieldFromJWT('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');

   const expirationDate = this.tokenExpired(String(token));

    if (expirationDate){
      this.logout();
      return false;
    }

    return true;
  }


   private tokenExpired(token: string) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token){return '';}
    const dataToken = JSON.parse(atob(token.split('.')[1]));

   // console.log("claims-urile sunt", dataToken[field]);
    return dataToken[field];
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/auth/login']);
  }

}
