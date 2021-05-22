import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advice } from '../models/advice.model';
import { Answer } from '../models/answer.model';
import { Appointment } from '../models/appointment.model';
import { PatientDisease } from '../models/patient-disease.model';
import { AddPatient } from '../models/add-patient.model';
import { Question } from '../models/question.model';
import { PatientQuestion } from '../models/patient-question.model';
import { AddAppointment } from '../models/add-appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorPostService {

  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  addAdvice(adviceModel : Advice){
    return this.http.post(`${this.apiUrl}/Advices`, adviceModel);
  }


  addPatient(patientModel : AddPatient){
    return this.http.post(`${this.apiUrl}/Patients`, patientModel);
  }


  async addQuestion(questionModel : Question){
    return this.http.post(`${this.apiUrl}/Questions`, questionModel).toPromise();
  }

  //Burada bir soru seçilecek. Bu sorunun id'si alınacak, answer modelin questionId'si olacak. Böylece srouya şık eklenmiş olacak.
  async addAnswer(answerModel : Answer){
    return this.http.post(`${this.apiUrl}/Answers`, answerModel).toPromise();
  }


  addDiseaseToPatient(patientDiseaseModel : PatientDisease) {  /*bu modelin patient idsi tıklanan patientten alınacak */
    return this.http.post(`${this.apiUrl}/PatientDiseases`, patientDiseaseModel);
  }

  addQuestiontoPatient(patientQuestionModel : PatientQuestion) {
    return this.http.post(`${this.apiUrl}/PatientQuestions`, patientQuestionModel);
  }

  addAppointment(appointmentModel : AddAppointment) { /*bu modelin patient idsi tıklanan patientten alınacak */
    return this.http.post(`${this.apiUrl}/Appointments`, appointmentModel);
  }



}




