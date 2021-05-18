import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginUser} from '../models/loginUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserInfo } from '../models/userInfo.model';
import { TokenInfo } from '../models/tokenInfo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:5001/api/";
  userToken : any;
  decodedToken : any;
  userRole : number;
  personId : number;

  public tokenInfo : TokenInfo = new TokenInfo();
  public userInfo : UserInfo = new UserInfo();

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient, private router : Router) { }


  async login(loginUser : LoginUser) {
    
    await this.http.post(this.apiUrl+"Authentication/Login",loginUser)
    .subscribe(data => {
      let tokenInfo = JSON.parse(JSON.stringify(data))['data'];
      this.saveTokenInfo(tokenInfo);
      this.decodedToken = this.jwtHelper.decodeToken(tokenInfo.token)
      console.log("decoded :",this.decodedToken);

      this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(this.userRole);
      this.personId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      this.getUserInfo().then(data => {
        localStorage.setItem("userInfo",JSON.stringify(data))
  
        this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
        this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
        this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
      });

      if(this.userRole == 3){
        this.router.navigateByUrl("admin-home");       
      }
      else if(this.userRole == 2) {
        //  this.router.navigateByUrl("doctor-home");
        this.router.navigate(['doctor-home', {personId : this.personId}])
      }
      else {
        this.router.navigateByUrl("");
      }
    });
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

  async getUserInfo() {
    return this.http.get(this.apiUrl+"Authentication/UserInfo").toPromise();
  }

  isLoggedIn(){
    if(localStorage.getItem("token") == null)
      return false;
    return true;
  }

  logout(personId : number) {
    this.http.post(`${this.apiUrl}Authentication/Logout`,personId);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExp");

    localStorage.removeItem("userInfo");
    this.router.navigateByUrl("/");
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

    return this.http.post(`${this.apiUrl}Authentication/ForgotPassword?gsm=${gsm}`, {headers : headers});
  }
 
}
