import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientAnswer } from '../models/patient-answer.model';
import { GetPatient } from '../models/get-patient.model';
import { DoctorGetService } from '../services/doctor-get.service';

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

  constructor(private activeRoute : ActivatedRoute,
              private getService : DoctorGetService) { }

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
      this.patientModel.diseases = JSON.parse(JSON.stringify(data.diseases))['$values']
    })

    await this.getService.getAnswersOfPatient(this.patientId)
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((x) => (this.patientAnswerList = x['$values']));

    console.log(this.patientAnswerList);
  }


}
