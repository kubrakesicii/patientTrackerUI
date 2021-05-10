import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientQuestion } from '../../models/patient-question.model';
import { Question } from '../../models/question.model';
import { DoctorDeleteService } from '../../services/doctor-delete.service';
import { DoctorGetService } from '../../services/doctor-get.service';
import { DoctorPostService } from '../../services/doctor-post.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  questionList : Question[];
  patientId : number;
  deptId : number;
  hospitalId : number;
  patQuestions : string[];
  patientQuestion : PatientQuestion = new PatientQuestion();
  patQuestionId : number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<QuestionDetailComponent>,
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

  addToPatient(questionId : number, patientId : number, event : Event){
    this.patientQuestion.questionPoolId = questionId;
    this.patientQuestion.patientId = patientId;

    this.postService.addQuestiontoPatient(this.patientQuestion).subscribe(() => {
      var tr = (event.target as Element).parentElement?.previousSibling?.previousSibling?.parentElement;
      tr?.classList.add("passive");
      this.ngOnInit();
    });

  }

  async deletePatQuestion(questionId : number, patientId : number, event : Event){
    this.patientQuestion.questionPoolId = questionId;
    this.patientQuestion.patientId = patientId;

    await this.getService.getPatQuestionId(this.patientQuestion).then((data) => this.patQuestionId = data);
    await this.deleteService.removeQuestionFromPatient(this.patQuestionId).subscribe(() => { 
      this.ngOnInit();
      var tr = (event.target as Element).parentElement?.previousSibling?.previousSibling?.parentElement;
      tr?.classList.remove("passive");
    });
  }

}