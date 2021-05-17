import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/admin/models/doctor.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { AddAppointment } from '../../models/add-appointment.model';
import { Appointment } from '../../models/appointment.model';
import { GetPatient } from '../../models/get-patient.model';
import { DoctorGetService } from '../../services/doctor-get.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  patientModel : GetPatient = new GetPatient();
  patientName : string;
  doctorModel : Doctor = new Doctor();
  userInfo : UserInfo = new UserInfo();
  appointmentModel : AddAppointment = new AddAppointment();


  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public dialogRef: MatDialogRef<AppointmentDetailComponent>,
              private getService : DoctorGetService,
              private alertify : AlertifyService) { }

  ngOnInit(): void {
    this.getPatientInfo();
  }

  async getPatientInfo() {
    await this.getService.getPatientById(this.data.patientId).then(data => {
      this.patientModel.id = data.id,
      this.patientModel.firstName = data.firstName,
      this.patientModel.lastName = data.lastName,
      this.patientModel.email = data.email,
      this.patientModel.gsm = data.gsm,
      this.patientModel.healthScore = data.healthScore,
      this.patientModel.identityNumber = data.identityNumber,
      this.patientModel.diseases = JSON.parse(JSON.stringify(data.diseases))['$values'],
      this.patientModel.departmentId = data.departmentId,
      this.patientModel.hospitalId = data.hospitalId
    })
    this.patientName =`${this.patientModel.firstName} ${this.patientModel.lastName}`;

     
   await this.getService.getDoctorById(JSON.parse(localStorage.getItem("userInfo") || "{}").id).then(data =>{
     this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
     this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
     this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
     this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
   });
  }


  addAppointment() {
    this.appointmentModel.doctorId = this.doctorModel.id;
    this.appointmentModel.patientId = this.patientModel.id;

    
  }

  setDate(event : Event) {
    
  }
}
