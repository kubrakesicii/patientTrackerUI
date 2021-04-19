import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginUser} from '../models/loginUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:5001/api/";
  userToken : any;
  decodedToken : any;
  userRole : any;

  userInfo : UserInfo = new UserInfo();

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient, private router : Router) { }

  async login(loginUser : LoginUser) {

      await this.getUserInfo().subscribe(data => {
        this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
        this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      });

      console.log(this.userInfo);
      
      let headers = new HttpHeaders();
      headers = headers.append("Content-type" , "application/json");
      this.http.post(this.apiUrl+"Authentication/Login",loginUser, {headers : headers})
      .subscribe(data => {
        let token = JSON.parse(JSON.stringify(data))['data'].token;
        let tokenExp = JSON.parse(JSON.stringify(data))['data'].tokenExpiration;
        this.saveTokenInfo(token, tokenExp);
        this.userToken = token;
        this.decodedToken = this.jwtHelper.decodeToken(token)
        this.userRole = this.userInfo.personType;

      
        if(this.userRole == 3){
            this.router.navigateByUrl("admin-home");
        }
        else if(this.userRole == 2) {
            this.router.navigateByUrl("doctor-home");
        }
      });
  }


  saveTokenInfo(token : string, tokenExp : string) {
    localStorage.setItem("token", token)
    localStorage.setItem("tokenExp", tokenExp);
  }

  getToken() : any {
    return localStorage.getItem("token");
  }

   getUserInfo() {
    return this.http.get(this.apiUrl+"Authentication/UserInfo");
  }

  /*
  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

  tokenNotExpired(){
    const tokenExp = new Date(localStorage.getItem("tokenExp"));

    if(Date.now() > tokenExp){

    }
  }
  */

 
}
