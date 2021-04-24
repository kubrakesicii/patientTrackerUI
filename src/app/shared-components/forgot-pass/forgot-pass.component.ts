import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  sendSms(gsm : string){
    this.authService.forgotPass(gsm).subscribe(data => {
        let result = JSON.parse(JSON.stringify(data));
        console.log(result);
        // if(result['success'] == false){
        //   console.log("Gsm is not found");
        // }
        // else {
        //   console.log("Your new password is send to your gsm! You can login with it");
        // }
    })
  }

}
