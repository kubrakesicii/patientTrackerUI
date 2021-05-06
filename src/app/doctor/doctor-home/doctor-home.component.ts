import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Disease } from 'src/app/admin/models/disease.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advice } from '../models/advice.model';
import { Answer } from '../models/answer.model';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';
import { PatientDisease } from '../models/patient-disease.model';
import { Patient } from '../models/patient.model';
import { Question } from '../models/question.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();
  doctorModel : Doctor = new Doctor();
  patDiseaseModel : PatientDisease = new PatientDisease();
  diseaseList : Disease[];
  patientList : Patient[];

  constructor(private authService : AuthService,
              private getService : DoctorGetService, 
              private postService : DoctorPostService) { }


  ngOnInit(): void {
    this.loadListData(); 
  }

   async getUserInfo(){
       this.userInfo.personId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;
       this.userInfo.personType = JSON.parse(localStorage.getItem("userInfo") || "{}").personType;
       this.userInfo.fullName = JSON.parse(localStorage.getItem("userInfo") || "{}").fullName;
   }
  
  async loadListData(){
    await this.getUserInfo();

    await this.getService.getDoctorById(this.userInfo.personId).then(data =>{
      this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
      this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
      this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
      this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
      this.doctorModel.isBlocked = JSON.parse(JSON.stringify(data)).isBlocked;
      this.doctorModel.personId = JSON.parse(JSON.stringify(data)).personId;
    });

    await this.getService.getAllPatients(this.userInfo.personId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientList = x['$values']));

  }


  addDisease(){
    return this.postService.addDiseaseToPatient(this.patDiseaseModel).subscribe(data => console.log(data));
  }



}
