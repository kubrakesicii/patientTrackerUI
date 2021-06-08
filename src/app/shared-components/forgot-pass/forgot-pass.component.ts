import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private authService : AuthService,
              private alertify : AlertifyService) { }
  gsmErr : boolean = false;

  ngOnInit(): void {
  }

  sendSms(gsm : string){
    this.authService.forgotPass(gsm)
    .subscribe(data => {
        let result = JSON.parse(JSON.stringify(data));
        if(!result['success']) {
          this.gsmErr = true;
        }
        else {
          this.alertify.success("New Password is sent to your GSM!");
        }
    })
  }

}
