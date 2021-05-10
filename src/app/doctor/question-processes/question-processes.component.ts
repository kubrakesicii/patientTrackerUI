import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { Answer } from '../models/answer.model';
import { Doctor } from '../models/doctor.model';
import { Question } from '../models/question.model';
import { DoctorDeleteService } from '../services/doctor-delete.service';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';

@Component({
  selector: 'app-question-processes',
  templateUrl: './question-processes.component.html',
  styleUrls: ['./question-processes.component.css']
})
export class QuestionProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  questionModel : Question = new Question();
  questionList : Question[];
  answerModel : Answer = new Answer();
  options : any;


  constructor(private getService : DoctorGetService, 
              private postService : DoctorPostService,
              private deleteService : DoctorDeleteService) {
                this.options = [{name :  "Multiple Choice Question", value : 1},
                                {name :  "Numeric Question", value : 2}];
               }

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

    await this.getService.getAllQuestions(this.doctorModel.departmentId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.questionList = x['$values']));

    this.questionList.forEach((x) => {
      x.questionType == 1 ? x.questionType = "Multiple Choice" : x.questionType = "Numeric"
    })
  }

    
  addQuestion(questionForm : NgForm){
    console.log(this.questionModel);
    this.questionModel.questionType = parseInt(this.questionModel.questionType);
    return this.postService.addQuestion(this.questionModel).subscribe(() => {
      this.ngOnInit();
      this.resetForm(questionForm);
    });
  }

  
  addAnswer(){
    this.answerModel.questionId = this.questionModel.id;
    return this.postService.addAnswer(this.answerModel).subscribe(data => console.log(data));
  }

  deleteQuestion(questionId : number) {
    this.deleteService.deleteQuestion(questionId).subscribe(() => {
      this.ngOnInit();
      //Alertify
    })
  }

  updateQuestion(questionId : number) {

  }


  resetForm(form : NgForm) {
    if(form == null){
      this.resetForm(form);
    }
    this.questionModel = {
      id : 0,
      description : '',
      upperLimit : 0,
      lowerLimit : 0,
      questionType : 0
    }
    this.answerModel = {
      id : 0,
      questionId : 0,
      description : '',
      score : 0,
    }
  }


}
