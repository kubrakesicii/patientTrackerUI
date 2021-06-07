import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { LoaderService } from 'src/app/shared-components/services/loader.service';
import { Answer } from '../models/answer.model';
import { Doctor } from '../models/doctor.model';
import { Question } from '../models/question.model';
import { DoctorDeleteService } from '../services/doctor-delete.service';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';
import { DoctorUpdateService } from '../services/doctor-update.service';

@Component({
  selector: 'app-question-processes',
  templateUrl: './question-processes.component.html',
  styleUrls: ['./question-processes.component.css']
})
export class QuestionProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  questionModel : Question = new Question();
  updatedQuestion : Question = new Question();
  questionList : Question[];
  insertId : number;
  questionType : number;
  answer1 : Answer = new Answer();
  answer2 : Answer = new Answer();
  answer3 : Answer = new Answer();
  answer4 : Answer = new Answer();

  options : any;
  public editMode = false;


  constructor(private getService : DoctorGetService,
              private postService : DoctorPostService,
              private deleteService : DoctorDeleteService,
              private updateService : DoctorUpdateService,
              private alertify : AlertifyService,
              public loaderService : LoaderService) {
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
  this.loaderService.isLoading.next(true);

    await this.getUserInfo();

    await this.getService.getDoctorById(this.userInfo.personId).then(data =>{
      this.doctorModel.id = JSON.parse(JSON.stringify(data)).id;
      this.doctorModel.departmentId = JSON.parse(JSON.stringify(data)).departmentId;
      this.doctorModel.degreeId = JSON.parse(JSON.stringify(data)).degreeId;
      this.doctorModel.email = JSON.parse(JSON.stringify(data)).email;
      this.doctorModel.personId = JSON.parse(JSON.stringify(data)).personId;
    });

    await this.getService.getAllQuestions(this.doctorModel.departmentId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.questionList = x['$values']))
    .finally(() => this.loaderService.isLoading.next(false));

    this.questionList.forEach((x) => {
      x.questionType == 1 ? x.questionType = "Multiple Choice" : x.questionType = "Numeric"
    })
  }


  async addQuestion(){
    this.loaderService.isLoading.next(true);

    this.questionModel.questionType = parseInt(this.questionModel.questionType);
    this.questionType = this.questionModel.questionType;

    await this.postService.addQuestion(this.questionModel).then((data) => {
      this.insertId = JSON.parse(JSON.stringify(data))['data'].id;
      this.ngOnInit();

      this.answer1.questionPoolId = this.insertId;
      this.answer2.questionPoolId = this.insertId;
      this.answer3.questionPoolId = this.insertId;
      this.answer4.questionPoolId = this.insertId;  
    })
    .finally(() => this.loaderService.isLoading.next(false));


    if(this.questionType == 1) {
      await this.addAnswer();
    } 
    
    this.alertify.success("Question Added Successfully!");
  }

  async addAnswer(){   
      await this.postService.addAnswer(this.answer1).then(data => console.log(data));
      await this.postService.addAnswer(this.answer2).then(data => console.log(data));
      await this.postService.addAnswer(this.answer3).then(data => console.log(data));
      await this.postService.addAnswer(this.answer4).then(data => console.log(data));
  }

  deleteQuestion(questionId : number) {
    this.alertify.confirm("Are you sure you want to remove this Question?", () => {
      this.loaderService.isLoading.next(true);

      this.deleteService.deleteQuestion(questionId)
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe(() => {
        this.ngOnInit();
        this.alertify.success("Question Removed Successfully!");
      })
    })
  }

  async updateQuestion(questionId : number) {
    this.editMode = true;
    await this.getService.getQuestionById(questionId).then(data => this.updatedQuestion = JSON.parse(JSON.stringify(data)));
  }

  saveQuestion(){
    this.loaderService.isLoading.next(true);

    this.updateService.updateQuestion(this.updatedQuestion.id, this.updatedQuestion)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe((data) => {
      this.ngOnInit();
      this.alertify.success("Question Updated Successfully!");
    });
    this.editMode = false;
  }

  cancelQuestion() {
    this.editMode = false;
    this.updatedQuestion = {
      id : 0,
      description : '',
      lowerLimit : 0,
      upperLimit : 0,
      questionType : 0
    }
  }

}
