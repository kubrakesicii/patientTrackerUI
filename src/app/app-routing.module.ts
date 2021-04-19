import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-components/admin-home/admin-home.component';
import { DoctorHomeComponent } from './doctor-components/doctor-home/doctor-home.component';
import { LoginComponent } from './shared-components/login/login.component';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "admin-home", component : AdminHomeComponent},
  {path : "doctor-home", component : DoctorHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
