import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { GetPatQuestion } from '../../models/get-pat-question.model';
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
  patientQuestionList : GetPatQuestion[];
  patQuestions : string[] = new Array();  
  patientQuestion : PatientQuestion = new PatientQuestion();
  patQuestionId : number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<QuestionDetailComponent>,
    private getService : DoctorGetService,
    private postService : DoctorPostService,
    private deleteService : DoctorDeleteService,
    private alertify : AlertifyService) { }

  ngOnInit(): void {
    this.patientId = this.data.patientId;
    this.deptId = this.data.deptId;
    this.hospitalId = this.data.hospitalId;
    this.patQuestions = new Array();  

    this.loadData();
  }


  async loadData() {
    await this.getService.getAllQuestions(this.data.deptId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.questionList = x['$values']));

    await this.getService.getQuestionsOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientQuestionList = x['$values']));

    this.patientQuestionList.forEach(x => {
      if(!this.patQuestions.includes(x.questionDesc))
        this.patQuestions.push(x.questionDesc)
    });

    console.log("Q List : ",this.patientQuestionList);
    console.log("Pat Questions : ",this.patQuestions);
  }

  addToPatient(questionId : number, patientId : number, event : Event){
    this.patientQuestion.questionPoolId = questionId;
    this.patientQuestion.patientId = patientId;

    this.postService.addQuestiontoPatient(this.patientQuestion).subscribe(() => {
      this.alertify.success("Question Added to Patient!");
      this.ngOnInit();
    });
  }

  async deletePatQuestion(questionId : number, patientId : number, event : Event){
    this.patientQuestion.questionPoolId = questionId;
    this.patientQuestion.patientId = patientId;

    await this.getService.getPatQuestionId(this.patientQuestion).then((data) => this.patQuestionId = data);
    await this.deleteService.removeQuestionFromPatient(this.patQuestionId).subscribe(() => { 
      this.alertify.success("Question Removed from Patient!");
      this.ngOnInit();
    });

  }

  async searchQuestion(filterText : string) {
    if(filterText == ""){
      await this.getService.getAllQuestions(this.data.deptId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.questionList = x['$values']));
    }
    await this.getService.getAllQuestions(this.data.deptId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.questionList = x['$values']));
      
    this.questionList = this.questionList.filter(question => {
      if(question.description.toLowerCase().includes(filterText.toLowerCase()))
        return true;
      return false;
   })
  }

}
