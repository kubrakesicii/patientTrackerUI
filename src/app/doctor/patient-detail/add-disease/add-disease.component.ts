import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disease } from 'src/app/admin/models/disease.model';
import { AdminGetService } from 'src/app/admin/services/admin-get.service';
import { PatientDisease } from '../../models/patient-disease.model';
import { DoctorDeleteService } from '../../services/doctor-delete.service';
import { DoctorGetService } from '../../services/doctor-get.service';
import { DoctorPostService } from '../../services/doctor-post.service';

@Component({
  selector: 'app-add-disease',
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.css']
})
export class AddDiseaseComponent implements OnInit {
  patientId : number;
  hospitalId : number;
  deptId : number;
  diseases : string[];

  diseaseList : Disease[];
  patientDiseaseModel : PatientDisease = new PatientDisease();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<AddDiseaseComponent>,
    private getService : DoctorGetService,
    private postService : DoctorPostService,
    private adminGetService : AdminGetService,
    private deleteService : DoctorDeleteService) { }

  ngOnInit(): void {
    this.patientId = this.data.patientId;
    this.deptId = this.data.deptId;
    this.hospitalId = this.data.hospitalId;
    this.diseases = this.data.diseases;

    this.loadData();
    console.log(this.diseases);

  }

  async loadData() {
    await this.adminGetService.getAllDiseasesByHospital(this.hospitalId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.diseaseList = x['$values']));

    console.log("disease list: ",this.diseaseList);

  }

  addToPatient(diseaseId : number, event : Event){
    this.patientDiseaseModel.diseaseId = diseaseId;
    this.patientDiseaseModel.patientId = this.patientId;

    this.postService.addDiseaseToPatient(this.patientDiseaseModel).subscribe(data => {
      var tr = (event.target as Element).parentElement?.previousSibling?.previousSibling?.parentElement;
      tr?.classList.add("passive");
    })
  }


  deleteFromPatient(diseaseId : number, patientId : number){
    this.patientDiseaseModel.diseaseId = diseaseId;
    this.patientDiseaseModel.patientId = patientId;

    this.deleteService.removeDiseaseFromPatient(this.patientDiseaseModel).subscribe(() => this.ngOnInit());
  }


}
