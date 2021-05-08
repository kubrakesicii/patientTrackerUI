import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advice } from '../models/advice.model';
import { Answer } from '../models/answer.model';
import { Appointment } from '../models/appointment.model';
import { PatientDisease } from '../models/patient-disease.model';
import { AddPatient } from '../models/add-patient.model';
import { Question } from '../models/question.model';

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


  addQuestion(questionModel : Question){
    return this.http.post(`${this.apiUrl}/Questions`, questionModel);
  }

  //Burada bir soru seçilecek. Bu sorunun id'si alınacak, answer modelin questionId'si olacak. Böylece srouya şık eklenmiş olacak.
  addAnswer(answerModel : Answer){
    return this.http.post(`${this.apiUrl}/Answers`, answerModel);
  }


  addDiseaseToPatient(patientDiseaseModel : PatientDisease) {  /*bu modelin patient idsi tıklanan patientten alınacak */
    return this.http.post(`${this.apiUrl}/PatientDiseases`, patientDiseaseModel);
  }


  addAppointment(appointmentModel : Appointment) { /*bu modelin patient idsi tıklanan patientten alınacak */
    return this.http.post(`${this.apiUrl}/Appointments`, appointmentModel);
  }

}




