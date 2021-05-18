import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/doctor/models/doctor.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { GetPatient } from '../models/get-patient.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';
import { PatientDisease } from '../models/patient-disease.model';
import { Disease } from 'src/app/admin/models/disease.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPatient } from '../models/add-patient.model';
import { NgForm } from '@angular/forms';
import { UpdatePatient } from '../models/update-patient.model';
import { DoctorDeleteService } from '../services/doctor-delete.service';
import { DoctorUpdateService } from '../services/doctor-update.service';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-patient-processes',
  templateUrl: './patient-processes.component.html',
  styleUrls: ['./patient-processes.component.css']
})
export class PatientProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  patientModel : AddPatient = new AddPatient();
  updatedPatient : UpdatePatient = new UpdatePatient();
  activePatientList : GetPatient[];
  removedPatientList : GetPatient[];
  personId : any;
  public editMode = false;

  patDiseaseModel : PatientDisease = new PatientDisease();
  diseaseList : Disease[];
  
  constructor(private getService : DoctorGetService,
              private postService : DoctorPostService,
              private deleteService : DoctorDeleteService,
              private updateService : DoctorUpdateService,
              private router : Router,
              private alertify : AlertifyService,
              private authService : AuthService) { }

  ngOnInit(): void {
      this.loadListData();
  }


  // async getUserInfo(){
  //   this.userInfo.personId = JSON.parse(localStorage.getItem("userInfo") || "{}").id ? JSON.parse(localStorage.getItem("userInfo") || "{}").id : this.personId;
  //   this.userInfo.personType = JSON.parse(localStorage.getItem("userInfo") || "{}").personType;
  //   this.userInfo.fullName = JSON.parse(localStorage.getItem("userInfo") || "{}").fullName;
  // }

  async loadListData(){
    await this.authService.getUserInfo().then((data) => {
      this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
      this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    })

    await this.getService.getDoctorById(this.userInfo.personId).then(data =>{
      this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
      this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
      this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
      this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
      this.doctorModel.personId = JSON.parse(JSON.stringify(data)).personId;
    });

    await this.getService.getAllActivePatients(this.userInfo.personId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.activePatientList = x['$values']));

    await this.getService.getAllRemovedPatients(this.userInfo.personId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.removedPatientList = x['$values']));
  }

  addPatient(patientForm : NgForm) {
    this.postService.addPatient(this.patientModel).subscribe(data => {
      this.ngOnInit();
      this.resetForm(patientForm);
      this.alertify.success("Patient Added Successfully!");
    });
  }

  addDisease(){
    return this.postService.addDiseaseToPatient(this.patDiseaseModel).subscribe(data => console.log(data));
  }

  resetForm(form : NgForm) {
    if(form == null){
      this.resetForm(form);
    }
    this.patientModel = {
      identityNumber : '',
      email : '',
      firstName : '',
      lastName : '',
      gsm : '',
    }
  }

  deletePatient(patientId : number) {
    this.alertify.confirm("Are you sure yout want to remove this Patient?", () => {
      this.deleteService.deletePatient(patientId).subscribe(() => {
        this.ngOnInit();
        this.alertify.success("Patient Removed Successfully!");
      })
    })
  }

  async updatePatient(patientId : number) {
    this.editMode = true;
    await this.getService.getPatientById(patientId).then(data => this.updatedPatient = JSON.parse(JSON.stringify(data)));
  }

  savePatient(){
    this.updateService
      .updatePatient(this.updatedPatient.id, this.updatedPatient)
      .subscribe((data) => {
        this.ngOnInit();
        this.alertify.success("Patient Updated Successfully!");
      });
      this.editMode = false;
  }

  cancelPatient() {
    this.editMode = false;
    this.updatedPatient = {
      id : 0,
      firstName : '',
      lastName : '',
      gsm : '',
      email : '',
      identityNumber : ''
    }
  }
}


