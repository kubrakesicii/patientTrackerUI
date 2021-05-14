import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { Advice } from '../models/advice.model';
import { Doctor } from '../models/doctor.model';
import { DoctorDeleteService } from '../services/doctor-delete.service';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';

@Component({
  selector: 'app-advice-processes',
  templateUrl: './advice-processes.component.html',
  styleUrls: ['./advice-processes.component.css']
})
export class AdviceProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  adviceModel : Advice = new Advice();
  adviceList : Advice[];

  constructor(private getService : DoctorGetService, 
              private postService : DoctorPostService,
              private deleteService : DoctorDeleteService,
              private toastr: ToastrService) { }

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

    await this.getService.getAllAdvices(this.doctorModel.departmentId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.adviceList = x['$values']));
    }


    addAdvice(adviceForm : NgForm){
      this.adviceModel.departmentId = this.doctorModel.departmentId;
      this.adviceModel.createdUserName = this.userInfo.fullName;

      return this.postService.addAdvice(this.adviceModel).subscribe(data => {
        this.resetForm(adviceForm);
        this.toastr.success("Advice is added successfully");
        this.ngOnInit();
        //show alertify message
      });
    }

    deleteAdvice(adviceId : number) {
      this.deleteService.deleteAdvice(adviceId).subscribe(data => {
        this.ngOnInit();
        //Alertify
      })
    }

    updateAdvice(adviceId : number) {
      
    }

    resetForm(form?: NgForm) {
      if(form == null){
        this.resetForm();
      }
      this.adviceModel = {
        description : '',
        createdUserName : 'string',
        departmentId: 0,
        id : 0
      }
    }
}
