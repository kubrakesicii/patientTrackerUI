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
import { PatientDetailComponent } from './doctor/patient-detail/patient-detail.component';
import { DiseaseDetailComponent } from './doctor/patient-detail/disease-detail/disease-detail.component';
import { QuestionDetailComponent } from './doctor/patient-detail/question-detail/question-detail.component';
import { AppointmentDetailComponent } from './doctor/patient-detail/appointment-detail/appointment-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { DoctorGetService } from './doctor/services/doctor-get.service';
import { DoctorPostService } from './doctor/services/doctor-post.service';
import { DoctorDeleteService } from './doctor/services/doctor-delete.service';
import { DoctorUpdateService } from './doctor/services/doctor-update.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    HospitalPipe,
    ForgotPassComponent,
    SearchPipe,
    NavbarComponent,
    SidebarComponent,
    PatientProcessesComponent,
    AdviceProcessesComponent,
    QuestionProcessesComponent,
    AppointmentProcessesComponent,
    PatientDetailComponent,
    DiseaseDetailComponent,
    QuestionDetailComponent,
    AppointmentDetailComponent,
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
    MatIconModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AdminCountService,
    AdminGetService,
    AdminPostService,
    DoctorGetService,
    DoctorPostService,
    DoctorDeleteService,
    DoctorUpdateService,
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
