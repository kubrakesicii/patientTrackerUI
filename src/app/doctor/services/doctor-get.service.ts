import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from 'src/app/admin/models/degree.model';
import { Department } from 'src/app/admin/models/department.model';
import { PatientAnswer } from '../models/patient-answer.model';
import { GetPatient } from '../models/get-patient.model';
import { Question } from '../models/question.model';
import { PatientDisease } from '../models/patient-disease.model';
import { PatientQuestion } from '../models/patient-question.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorGetService {

  apiUrl = "https://localhost:5001/api";

  constructor(private http : HttpClient) { }

  async getAllAdvices(deptId : any){
    return this.http.get(`${this.apiUrl}/Advices?deptId=${deptId}`).toPromise();
  }

  async getAllQuestions(deptId : any){
    return this.http.get<Question[]>(`${this.apiUrl}/Questions?deptId=${deptId}`).toPromise();
  }

  async getAllAppointments(doctorId:any){
    return this.http.get(`${this.apiUrl}/Appointments/Doctors?doctorId=${doctorId}`).toPromise();
  }

  async getAllExpiredAppointments(doctorId:any){
    return this.http.get(`${this.apiUrl}/Appointments/Doctors/Expired?doctorId=${doctorId}`).toPromise();
  }


  async getAllActivePatients(doctorId : any){
    return this.http.get(`${this.apiUrl}/DoctorPatients/ActivePatientsOfDoctor?doctorId=${doctorId}`).toPromise();
  }

  async getAllRemovedPatients(doctorId : any){
    return this.http.get(`${this.apiUrl}/DoctorPatients/RemovedPatientsOfDoctor?doctorId=${doctorId}`).toPromise();
  }

  async getDoctorById(doctorId : number) {
    return this.http.get(`${this.apiUrl}/Doctors/PersonId?personId=${doctorId}`).toPromise();
  }

  async getDegreeById(degreeId : number) {
    return this.http.get<Degree>(`${this.apiUrl}/Degrees/${degreeId}`).toPromise();
  }

  async getDeptById(deptId : number) {
    return this.http.get<Department>(`${this.apiUrl}/Departments/${deptId}`).toPromise();
  }

  async getPatientById(patientId : number) {
    return this.http.get<GetPatient>(`${this.apiUrl}/Patients/ById/${patientId}`).toPromise();
  }

  async getAdviceById(adviceId : number) {
    return this.http.get(`${this.apiUrl}/Advices/${adviceId}`).toPromise();
  }

  async getAppointmentById(appointmentId : number) {
    return this.http.get(`${this.apiUrl}/Appointments/${appointmentId}`).toPromise();
  }

  async getAppointmentPatDoctor(patientId : number,doctorId : number) {
    return this.http.get(`${this.apiUrl}/Appointments/ByPatientDoctor?patientId=${patientId}&doctorId=${doctorId}`).toPromise();
  }

  async getQuestionById(questionId : number) {
    return this.http.get(`${this.apiUrl}/Questions/${questionId}`).toPromise();
  }

  async getAnswersOfPatient(patientId : number) {
    return this.http.get<PatientAnswer[]>(`${this.apiUrl}/PatientAnswers/AnswersOfPatient?patientId=${patientId}`).toPromise();
  }

  async getAnswerHistoryOfPatient(patientId : number) {
    return this.http.get<PatientAnswer[]>(`${this.apiUrl}/PatientAnswers/AnswerHistoryOfPatient?patientId=${patientId}`).toPromise();
  }

  async getQuestionsOfPatient(patientId : number) {
    return this.http.get<PatientAnswer[]>(`${this.apiUrl}/PatientQuestions/Questions?patientId=${patientId}`).toPromise();
  }

  async getPatDiseaseId(model : PatientDisease) {
    return this.http.post<number>(`${this.apiUrl}/PatientDiseases/GetId`,model).toPromise();
  }

  async getPatQuestionId(model : PatientQuestion) {
    return this.http.post<number>(`${this.apiUrl}/PatientQuestions/GetId`,model).toPromise();
  }

}
