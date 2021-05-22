import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { Doctor } from 'src/app/admin/models/doctor.model';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { LoaderService } from 'src/app/shared-components/services/loader.service';
import { AddAppointment } from '../../models/add-appointment.model';
import { Appointment } from '../../models/appointment.model';
import { GetPatient } from '../../models/get-patient.model';
import { DoctorGetService } from '../../services/doctor-get.service';
import { DoctorPostService } from '../../services/doctor-post.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  @ViewChild('picker') picker: any;


  patientModel : GetPatient = new GetPatient();
  patientName : string;
  doctorModel : Doctor = new Doctor();
  userInfo : UserInfo = new UserInfo();
  appointmentModel : AddAppointment = new AddAppointment();
  existingAppointment : Appointment = new Appointment();
  appdate : any;apptime:any;


  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];


  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public dialogRef: MatDialogRef<AppointmentDetailComponent>,
              private getService : DoctorGetService,
              private alertify : AlertifyService,
              private postService : DoctorPostService,
              public loaderService : LoaderService) {
              }

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

   await this.getService.getAppointmentPatDoctor(this.patientModel.id,this.doctorModel.id).then((data) =>this.existingAppointment =  JSON.parse(JSON.stringify(data)));

  }

  addAppointment(appDate : any) {
    this.loaderService.isLoading.next(true);

    this.appointmentModel.doctorId = this.doctorModel.id;
    this.appointmentModel.patientId = this.patientModel.id;

    let date = new Date(appDate);
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);

    this.appointmentModel.date = date;

    //console.log(date);
    this.postService.addAppointment(this.appointmentModel)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe((data) => {
      console.log("app added");
      console.log(this.appointmentModel);
      this.alertify.success("Appointment Added Successfully!");
      this.dialogRef.close();
    })
    
  }

}
