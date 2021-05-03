import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advice } from '../models/advice.model';
import { Answer } from '../models/answer.model';
import { PatientDisease } from '../models/patient-disease.model';
import { Patient } from '../models/patient.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorPostService {

  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  addAdvice(adviceModel : Advice){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");
    
    return this.http.post(`${this.apiUrl}/Advices`, adviceModel, {headers : headers});
  }


  addPatient(patientModel : Patient){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Patients`, patientModel, {headers : headers});
  }


  addQuestion(questionModel : Question){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Questions`, questionModel, {headers : headers});
  }

  //Burada bir soru seçilecek. Bu sorunun id'si alınacak, answer modelin questionId'si olacak. Böylece srouya şık eklenmiş olacak.
  addAnswer(answerModel : Answer){
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/Answers`, answerModel, {headers : headers});
  }


  addDiseaseToPatient(patientDiseaseModel : PatientDisease) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type" , "application/json");

    return this.http.post(`${this.apiUrl}/PatientDiseases`, patientDiseaseModel, {headers : headers});
  }





}




