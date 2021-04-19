import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../../auth/models/loginUser.model';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel : LoginUser = new LoginUser();

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    
  }

  login(form : NgForm){
    this.authService.login(this.loginModel);
  }

}
