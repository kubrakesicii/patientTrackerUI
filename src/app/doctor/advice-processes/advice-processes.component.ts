import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { Advice } from '../models/advice.model';
import { Doctor } from '../models/doctor.model';
import { DoctorDeleteService } from '../services/doctor-delete.service';
import { DoctorGetService } from '../services/doctor-get.service';
import { DoctorPostService } from '../services/doctor-post.service';
import { DoctorUpdateService } from '../services/doctor-update.service';

@Component({
  selector: 'app-advice-processes',
  templateUrl: './advice-processes.component.html',
  styleUrls: ['./advice-processes.component.css']
})
export class AdviceProcessesComponent implements OnInit {
  userInfo : UserInfo = new UserInfo();

  doctorModel : Doctor = new Doctor();
  adviceModel : Advice = new Advice();
  updatedAdvice : Advice = new Advice();
  adviceList : Advice[];

  public editMode = false;

  constructor(private getService : DoctorGetService, 
              private postService : DoctorPostService,
              private deleteService : DoctorDeleteService,
              private updateService : DoctorUpdateService,
              private alertify : AlertifyService) { }

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
        this.ngOnInit();
        this.alertify.success("Advice Added Successfully!");
      });
    }

    deleteAdvice(adviceId : number) {
      this.alertify.confirm("Are you sure you want to delete this advice?", () => {
        this.deleteService.deleteAdvice(adviceId).subscribe(data => {
          this.ngOnInit();
          this.alertify.success("Advice Removed Successfully!");
        })
      })
    }

    async updateAdvice(adviceId : number) {
      this.editMode = true;
      await this.getService.getAdviceById(adviceId).then(data => {
        this.updatedAdvice.id = JSON.parse(JSON.stringify(data))['id'];
        this.updatedAdvice.description = JSON.parse(JSON.stringify(data))['description'];
        this.updatedAdvice.createdUserName = JSON.parse(JSON.stringify(data))['createdUserName'];
        this.updatedAdvice.departmentId = this.doctorModel.departmentId;
      });
    }

    saveAdvice() {
      this.updateService.updateAdvice(this.updatedAdvice.id, this.updatedAdvice)
      .subscribe((data) => {
        this.ngOnInit();
        this.alertify.success("Advice Updated Successfully!");
      });
      this.editMode = false;
    }

    cancelAdvice() {
      this.editMode = false;
      this.updatedAdvice = {
        id : 0,
        description : '',
        createdUserName : '',
        departmentId : 0
      }
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
