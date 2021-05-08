import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from 'src/app/admin/models/degree.model';
import { Department } from 'src/app/admin/models/department.model';
import { PatientAnswer } from '../models/patient-answer.model';
import { GetPatient } from '../models/get-patient.model';

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
    return this.http.get(`${this.apiUrl}/Questions/All?deptId=${deptId}`).toPromise();
  }

  async getAllAppointments(doctorId:any){
    return this.http.get(`${this.apiUrl}/Appointments/Doctors?doctorId=${doctorId}`).toPromise();
  }

  async getAllPatients(doctorId : any){
    return this.http.get(`${this.apiUrl}/DoctorPatients/PatientsOfDoctor?doctorId=${doctorId}`).toPromise();
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

  async getAnswersOfPatient(patientId : number) {
    return this.http.get<PatientAnswer[]>(`${this.apiUrl}/PatientAnswers/AnswersOfPatient?patientId=${patientId}`).toPromise();
  }

}
