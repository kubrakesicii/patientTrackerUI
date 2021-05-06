import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/doctor/models/doctor.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { Patient } from '../models/patient.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';
import { PatientDisease } from '../models/patient-disease.model';
import { Disease } from 'src/app/admin/models/disease.model';

@Component({
  selector: 'app-patient-processes',
  templateUrl: './patient-processes.component.html',
  styleUrls: ['./patient-processes.component.css']
})
export class PatientProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  patientModel : Patient = new Patient();
  patientList : Patient[];

  patDiseaseModel : PatientDisease = new PatientDisease();
  diseaseList : Disease[];
  
  constructor(private getService : DoctorGetService,
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

  addPatient() {
    return this.postService.addPatient(this.patientModel).subscribe(data => console.log(data));
  }

  addDisease(){
    return this.postService.addDiseaseToPatient(this.patDiseaseModel).subscribe(data => console.log(data));
  }


}
