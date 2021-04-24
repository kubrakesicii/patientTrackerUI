import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { LoginComponent } from './shared-components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'doctor-home',
    component: DoctorHomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
