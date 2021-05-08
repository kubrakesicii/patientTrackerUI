import { Component, OnInit } from '@angular/core';
import { Degree } from 'src/app/admin/models/degree.model';
import { Department } from 'src/app/admin/models/department.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Doctor } from 'src/app/doctor/models/doctor.model';
import { DoctorGetService } from 'src/app/doctor/services/doctor-get.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  doctorModel : Doctor = new Doctor();
  userInfo : UserInfo = new UserInfo();
  degree : Degree = new Degree();
  department : Department = new Department();

  constructor(private getService : DoctorGetService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }


  async getUserInfo(){
    this.userInfo.personId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;
    this.userInfo.personType = JSON.parse(localStorage.getItem("userInfo") || "{}").personType;
    this.userInfo.fullName = JSON.parse(localStorage.getItem("userInfo") || "{}").fullName;
}

async loadData(){
 await this.getUserInfo();

 await this.getService.getDoctorById(this.userInfo.personId).then(data =>{
   this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
   this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
   this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
   this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
   this.doctorModel.isBlocked = JSON.parse(JSON.stringify(data)).isBlocked;
   this.doctorModel.personId = JSON.parse(JSON.stringify(data)).personId;
 });

 await this.getService.getDegreeById(this.doctorModel.degreeId).then(data => this.degree = data);
 await this.getService.getDeptById(this.doctorModel.departmentId).then(data => this.department = data);
}


logout(){
  console.log("logout event");
  this.authService.logout(this.userInfo.personId);
}

}
