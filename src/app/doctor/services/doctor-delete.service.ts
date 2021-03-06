import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDisease } from '../models/patient-disease.model';
import { PatientQuestion } from '../models/patient-question.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorDeleteService {
  apiUrl = "http://localhost:5000/api";

  constructor(private http : HttpClient) { }

  deleteAdvice(adviceId : number) {
    return this.http.delete(`${this.apiUrl}/Advices/${adviceId}`);
  }

  deleteQuestion(questionId : number) {
    return this.http.delete(`${this.apiUrl}/Questions/${questionId}`);
  }

  removeQuestionFromPatient(patientQuestionId : number){
    return this.http.delete(`${this.apiUrl}/PatientQuestions/${patientQuestionId}`);
  }
  
  removeDiseaseFromPatient(patientDiseaseId : number){
    return this.http.delete(`${this.apiUrl}/PatientDiseases/${patientDiseaseId}`);
  }

  deletePatient(patientId : number) {
    return this.http.delete(`${this.apiUrl}/Patients/${patientId}`);
  }

  deleteAppointment(appointmentId : number) {
    return this.http.delete(`${this.apiUrl}/Appointments/${appointmentId}`);
  }
}
