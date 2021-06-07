import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginUser } from '../../auth/models/loginUser.model';
import { AuthService } from '../../auth/services/auth.service';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { AlertifyService } from '../services/alertify.service';
import { LoaderService } from '../services/loader.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel : LoginUser = new LoginUser();

  constructor(public authService : AuthService,
              private dialog: MatDialog,
              private alertify : AlertifyService,
              public loaderService : LoaderService
             ) {}

  ngOnInit(): void {
    
  }

  login(form : NgForm){
    this.authService.login(this.loginModel);
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;

    this.dialog
      .open(ForgotPassComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        
      });
  }

}
