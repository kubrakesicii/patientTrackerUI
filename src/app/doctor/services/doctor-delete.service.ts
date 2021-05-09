import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDisease } from '../models/patient-disease.model';
import { PatientQuestion } from '../models/patient-question.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorDeleteService {
  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  deleteAdvice(adviceId : number) {
    return this.http.delete(`${this.apiUrl}/Advices/${adviceId}`);
  }

  deleteQuestion(questionId : number) {
    return this.http.delete(`${this.apiUrl}/Questions/${questionId}`);
  }

  removeQuestionFromPatient(patientQuestion : PatientQuestion){
    return this.http.post(`${this.apiUrl}/PatientQuestions/RemoveFromPatient`,patientQuestion);
  }

  
  removeDiseaseFromPatient(patientDisease : PatientDisease){
    return this.http.post(`${this.apiUrl}/PatientDiseases/RemoveFromPatient`,patientDisease);
  }
}
