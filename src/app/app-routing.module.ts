import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdviceProcessesComponent } from './doctor/advice-processes/advice-processes.component';
import { AppointmentProcessesComponent } from './doctor/appointment-processes/appointment-processes.component';
import { PatientDetailComponent } from './doctor/patient-detail/patient-detail.component';
import { PatientProcessesComponent } from './doctor/patient-processes/patient-processes.component';
import { QuestionProcessesComponent } from './doctor/question-processes/question-processes.component';
import { LoginComponent } from './shared-components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
  },
  {
    path: 'doctor-home',
    component: PatientProcessesComponent,
  },
  {
    path: 'doctor-home/patient-processes',
    component: PatientProcessesComponent,
  },
  {
    path: 'doctor-home/advice-processes',
    component: AdviceProcessesComponent,
  },
  {
    path: 'doctor-home/question-processes',
    component: QuestionProcessesComponent,
  },
  {
    path: 'doctor-home/appointment-processes',
    component: AppointmentProcessesComponent,
  },
  {
    path: 'doctor-home/patient-details/:patientId',
    component: PatientDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
