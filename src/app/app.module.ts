import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared-components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';
import { HospitalPipe } from './admin/pipes/hospital.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPassComponent } from './shared-components/forgot-pass/forgot-pass.component';
import { AdminCountService } from './admin/services/admin-count.service';
import { AdminGetService } from './admin/services/admin-get.service';
import { AdminPostService } from './admin/services/admin-post.service';
import { SearchPipe } from './admin/pipes/search.pipe';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import { PatientProcessesComponent } from './doctor/patient-processes/patient-processes.component';
import { AdviceProcessesComponent } from './doctor/advice-processes/advice-processes.component';
import { QuestionProcessesComponent } from './doctor/question-processes/question-processes.component';
import { AppointmentProcessesComponent } from './doctor/appointment-processes/appointment-processes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    DoctorHomeComponent,
    HospitalPipe,
    ForgotPassComponent,
    SearchPipe,
    NavbarComponent,
    SidebarComponent,
    PatientProcessesComponent,
    AdviceProcessesComponent,
    QuestionProcessesComponent,
    AppointmentProcessesComponent,
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
    MatSidenavModule,
  ],
  providers: [
    AuthService,
    AdminCountService,
    AdminGetService,
    AdminPostService,
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
