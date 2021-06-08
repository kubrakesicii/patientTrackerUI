import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientAnswer } from '../models/patient-answer.model';
import { GetPatient } from '../models/get-patient.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DiseaseDetailComponent } from './disease-detail/disease-detail.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { GetPatQuestion } from '../models/get-pat-question.model';
import { Appointment } from '../models/appointment.model';
import { Doctor } from 'src/app/admin/models/doctor.model';
import { LoaderService } from 'src/app/shared-components/services/loader.service';

declare function divideArrIntoDays(message: PatientAnswer[]) : any;
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientId : number;
 
  private sub : any;
  patientModel : GetPatient = new GetPatient();
  patientAnswerList : PatientAnswer[] = new Array();
  answerHistory : PatientAnswer[] = new Array();

  patientQuestionList : GetPatQuestion[];
  patQuestions : string[] = new Array();
  patAnswers : string[] = new Array();
  existingAppointment : Appointment = new Appointment();
  doctorModel : Doctor = new Doctor();


  public show = false;

  answerDateDivider : any = new Array();

  public selectedDate : string;


  constructor(private activeRoute : ActivatedRoute,
              private getService : DoctorGetService,
              private dialog: MatDialog,
              public loaderService : LoaderService) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.patientId = +params['patientId'];
    });

    this.patQuestions.splice(0, this.patQuestions.length)
    this.getPatientInfo();
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  async getPatientInfo() {
    this.loaderService.isLoading.next(true);

    await this.getService.getPatientById(this.patientId).then(data => {
      this.patientModel.id = data.id,
      this.patientModel.firstName = data.firstName,
      this.patientModel.lastName = data.lastName,
      this.patientModel.email = data.email,
      this.patientModel.gsm = data.gsm,
      this.patientModel.healthScore = data.healthScore,
      this.patientModel.identityNumber = data.identityNumber,
      this.patientModel.diseases = JSON.parse(JSON.stringify(data.diseases))['$values'],
      this.patientModel.departmentId = data.departmentId,
      this.patientModel.hospitalId = data.hospitalId,
      this.patientModel.age = data.age,
      this.patientModel.weight = data.weight,
      this.patientModel.height = data.height
    })

    await this.getService.getQuestionsOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientQuestionList = x['$values']));

    this.patientQuestionList.forEach(x => {
      if(!this.patQuestions.includes(x.questionDesc))
        this.patQuestions.push(x.questionDesc)
    });


    await this.getService.getAnswersOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientAnswerList = x['$values']));
    

    await this.getService.getAnswerHistoryOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.answerHistory = x['$values']));


    this.answerDateDivider = divideArrIntoDays(this.patientAnswerList);
    //console.log("answerDateDivider" , this.answerDateDivider);
        
   await this.getService.getDoctorById(JSON.parse(localStorage.getItem("userInfo") || "{}").id).then(data =>{
    this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
  });

    await this.getService.getAppointmentPatDoctor(this.patientModel.id,this.doctorModel.id)
    .finally(() => this.loaderService.isLoading.next(false))
    .then((data) =>this.existingAppointment =  JSON.parse(JSON.stringify(data)));

  }

  

  openQuestionDialog(patientId : number, deptId : number, hospitalId : number, patQuestions : string[]){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {patientId, deptId, hospitalId, patQuestions};
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;

      this.dialog
        .open(QuestionDetailComponent, dialogConfig)
        .afterClosed()
        .subscribe((res) => {
          this.ngOnInit();
        })
  }

  openAppointmentDialog(patientId : number, deptId : number, hospitalId : number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {patientId, deptId, hospitalId};
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    this.dialog
      .open(AppointmentDetailComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.ngOnInit();
      })
  }

  openDiseaseDialog(patientId : number, deptId : number, hospitalId : number, diseases : string[]){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {patientId, deptId, hospitalId, diseases};
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;

    this.dialog
      .open(DiseaseDetailComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.ngOnInit();
      })
  }


  openAnsTable(date : string){
    this.show = true;
    this.selectedDate = date;

    console.log("open : ",this.show);

  }

  closeAnsTable(date : string){
    this.show = false;
    this.selectedDate = date;

    console.log("close : ",this.show);
  }

}
