import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';

@Component({
  selector: 'app-appointment-processes',
  templateUrl: './appointment-processes.component.html',
  styleUrls: ['./appointment-processes.component.css']
})
export class AppointmentProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  appointmentModel : Appointment = new Appointment();
  appointmentList : Appointment[];


  constructor(private getService : DoctorGetService, 
              private postService : DoctorPostService) { }

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

    await this.getService.getAllAppointments(this.doctorModel.id)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.appointmentList = x['$values']));
  }


  deleteAppointment(appointmentId : number) {

  }
  
  updateAppointment(appointmentId : number) {
    
  }

}
