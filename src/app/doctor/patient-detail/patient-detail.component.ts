import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientAnswer } from '../models/patient-answer.model';
import { GetPatient } from '../models/get-patient.model';
import { DoctorGetService } from '../services/doctor-get.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DiseaseDetailComponent } from './disease-detail/disease-detail.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { PatientQuestion } from '../models/patient-question.model';
import { GetPatQuestion } from '../models/get-pat-question.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientId : number;
 
  private sub : any;
  patientModel : GetPatient = new GetPatient();
  patientAnswerList : PatientAnswer[];
  patientQuestionList : GetPatQuestion[];
  patQuestions : string[] = new Array();
  patAnswers : string[] = new Array();


  constructor(private activeRoute : ActivatedRoute,
              private getService : DoctorGetService,
              private dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.patientId = +params['patientId'];
    });

    console.log(this.patientId);
    this.getPatientInfo();
  }



  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  async getPatientInfo() {
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
      this.patientModel.hospitalId = data.hospitalId
    })

    await this.getService.getQuestionsOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientQuestionList = x['$values']));

    this.patientQuestionList.forEach(x => this.patQuestions.push(x.questionDesc));

    await this.getService.getAnswersOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientAnswerList = x['$values']));
    this.patientAnswerList.forEach(x => this.patAnswers.push(x.questionDesc));

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
    dialogConfig.disableClose = false;

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


}
