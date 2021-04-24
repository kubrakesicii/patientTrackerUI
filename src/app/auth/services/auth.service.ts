import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginUser} from '../models/loginUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserInfo } from '../models/userInfo.model';
import { TokenInfo } from '../models/tokenInfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:5001/api/";
  userToken : any;
  decodedToken : any;
  userRole : number;

  public tokenInfo : TokenInfo = new TokenInfo();
  public userInfo : UserInfo = new UserInfo();

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient, private router : Router) { }


  async login(loginUser : LoginUser) {
  
      let headers = new HttpHeaders();
      headers = headers.append("Content-type" , "application/json");
      this.http.post(this.apiUrl+"Authentication/Login",loginUser, {headers : headers})
      .subscribe(data => {
        let tokenInfo = JSON.parse(JSON.stringify(data))['data'];
        this.saveTokenInfo(tokenInfo);
        
        this.userToken = this.tokenInfo.token;
        this.decodedToken = this.jwtHelper.decodeToken(this.userToken)
      });

      await this.getUserInfo().subscribe(data => {
        this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
        this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
        this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
      });

      console.log(this.userInfo.personType);
      this.userRole = this.userInfo.personType;

      if(this.userRole == 3){
        this.router.navigateByUrl("admin-home");
      }
      else if(this.userRole == 2) {
         this.router.navigateByUrl("doctor-home");
      }
  }


  saveTokenInfo(tokenInfo : TokenInfo) {
    localStorage.setItem("token", tokenInfo.token)
    localStorage.setItem("tokenExp", tokenInfo.tokenExpiration.toString());
    localStorage.setItem("refreshToken",tokenInfo.refreshToken);
    localStorage.setItem("refreshTokenExp", tokenInfo.refreshTokenExpiration.toString());
  }

  getToken() : any {
    return localStorage.getItem("token");
  }

  getRefreshToken() : any {
    return localStorage.getItem("refreshToken");
  }

  getUserInfo() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",`Bearer ${this.getToken()}`)
    return this.http.get(this.apiUrl+"Authentication/UserInfo",{headers : headers});
  }

  isLoggedIn(){
    if(localStorage.getItem("token") == null)
      return false;
    return true;
  }

  logout() {
    this.http.post(this.apiUrl + "Authentication/Logout", this.userInfo.personId);
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

  refreshLogin(refreshToken : string) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    this.http.post("Authentication/RefreshLogin", this.getRefreshToken(), {headers : headers})
      .subscribe(data => {
        this.tokenInfo = JSON.parse(JSON.stringify(data))['data'];

        this.saveTokenInfo(this.tokenInfo);
      })
  }

  forgotPass(gsm : string){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`Authentication/ForgotPassword?gsm=${gsm}`, {headers : headers});
  }
 
}
