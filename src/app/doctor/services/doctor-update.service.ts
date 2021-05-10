import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPatient } from '../models/add-patient.model';
import { Advice } from '../models/advice.model';
import { Appointment } from '../models/appointment.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorUpdateService {

  
  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  updateQuestion(questionId : number, updatedQuestion : Question) {
    return this.http.put(`${this.apiUrl}/Questions?id=${questionId}`,updatedQuestion);
  }

  updateAdvice(adviceId : number, updatedAdvice : Advice) {
    return this.http.put(`${this.apiUrl}/Advices?id=${adviceId}`,updatedAdvice);
  }

  updateAppointment(appointmentId : number, updatedAppointment : Appointment) {
    return this.http.put(`${this.apiUrl}/Appointments?id=${appointmentId}`,updatedAppointment);
  }

  updatePatient(patientId : number, updatedPatient : AddPatient) {
    return this.http.put(`${this.apiUrl}/Patients?patientId=${patientId}`,updatedPatient);
  }

}
