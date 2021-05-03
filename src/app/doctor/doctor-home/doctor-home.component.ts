import { Component, OnInit } from '@angular/core';
import { Disease } from 'src/app/admin/models/disease.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advice } from '../models/advice.model';
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
  patientModel : Patient = new Patient();
  questionModel : Question = new Question();
  patDiseaseModel : PatientDisease = new PatientDisease();
  adviceModel : Advice = new Advice();

  adviceList : Advice[];
  questionList : Question[];
  diseaseList : Disease[];

  constructor(private authService : AuthService,
              private getService : DoctorGetService, 
              private postService : DoctorPostService) { }


  ngOnInit(): void {
    this.getUserInfo();
  }
  
  async getUserInfo() {
    await this.authService.getUserInfo().subscribe((data) => {
      this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
      this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    });

    await this.getService.getDoctorById(this.userInfo.personId).subscribe(data => console.log(data));
  }

  async getCurrentDoctor() {
    return this.getService.getDoctorById(this.userInfo.personId).subscribe(data =>{
      this.doctorModel.id = JSON.parse(JSON.stringify(data)).$id;
      this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
      this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
      this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
      this.doctorModel.isBlocked = JSON.parse(JSON.stringify(data)).isBlocked;
      this.doctorModel.personId = JSON.parse(JSON.stringify(data)).personId;
    });
  }



  addPatient() {
    return this.postService.addPatient(this.patientModel).subscribe(data => console.log(data));
  }

  getAllPatients(){
    return this.getService.getAllPatients(this.userInfo.personId).subscribe(data => console.log(data));
  }
 
  addQuestion(){
    return this.postService.addQuestion(this.questionModel).subscribe(data => console.log(data));
  }

  addDisease(){
    return this.postService.addDiseaseToPatient(this.patDiseaseModel).subscribe(data => console.log(data));
  }

  addAdvice(){
    this.adviceModel.departmentId = this.doctorModel.departmentId;
    return this.postService.addAdvice(this.adviceModel).subscribe(data => console.log(data));
  }

  getAllAdvices(){
    return this.getService.getAllAdvices(this.doctorModel.departmentId).subscribe(data => console.log(data));
  }

  getAllQuestions(){
    return this.getService.getAllQuestions(this.doctorModel.departmentId).subscribe(data => console.log(data));
  }
}
