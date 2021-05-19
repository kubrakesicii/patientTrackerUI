import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
  currentRoute: string;

  constructor(private getService : DoctorGetService,
              private authService : AuthService,
              private activeRoute : ActivatedRoute) { 
                
              }

  ngOnInit(): void {
    this.loadData();
    this.activeRoute.url.subscribe(data => this.currentRoute = data[1].path)
  }


async loadData(){
  await this.authService.getUserInfo().then((data) => {
    this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
    this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
    this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
  })
  
 console.log(this.userInfo.personId)

 await this.getService.getDoctorById(this.userInfo.personId).then(data =>{
   this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
   this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
   this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
   this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
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
