import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { PatientDisease } from '../../models/patient-disease.model';
import { PatientQuestion } from '../../models/patient-question.model';
import { Question } from '../../models/question.model';
import { DoctorDeleteService } from '../../services/doctor-delete.service';
import { DoctorGetService } from '../../services/doctor-get.service';
import { DoctorPostService } from '../../services/doctor-post.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  questionList : Question[];
  patientId : number;
  deptId : number;
  hospitalId : number;
  patQuestions : string[];
  patientQuestion : PatientQuestion = new PatientQuestion();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<AddQuestionComponent>,
    private getService : DoctorGetService,
    private postService : DoctorPostService,
    private deleteService : DoctorDeleteService) { }

  ngOnInit(): void {
    this.patientId = this.data.patientId;
    this.deptId = this.data.deptId;
    this.hospitalId = this.data.hospitalId;
    this.patQuestions = this.data.patQuestions;

    this.loadData();
  }


  async loadData() {
    await this.getService.getAllQuestions(this.data.deptId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.questionList = x['$values']));

    console.log(this.questionList);

  }

  addToPatient(questionId : number){

  }

  deletePatQuestion(questionId : number){
    this.patientQuestion.questionId = questionId;
    this.patientQuestion.patientId = this.patientId;

    this.deleteService.removeQuestionFromPatient(this.patientQuestion).subscribe(() => this.ngOnInit());
  }

}
