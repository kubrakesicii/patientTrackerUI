import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared-components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { AdminHomeService } from './admin/admin-home/admin-home.service';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';
import { HospitalPipe } from './admin/admin-home/hospital.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPassComponent } from './shared-components/forgot-pass/forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    DoctorHomeComponent,
    HospitalPipe,
    ForgotPassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    AdminHomeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
